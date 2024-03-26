import { useState, useEffect, useRef } from "react";
import Card from "./components/CountryCard";



function App() {
  const [countries, setCountries] = useState([]);

  let cachedCountries = useRef([]);

  const fetchData = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      if (!res.ok) throw new Error("Some Error occurred!");

      const data = await res.json();
      cachedCountries.current = data;
      setCountries(data)
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = e => {
    const val = e.target.value.toLowerCase();
    const filteredCountries = cachedCountries.current.filter(country => {
      return country.name.common.toLowerCase().includes(val);
    })
    setCountries(filteredCountries)
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (countries.length === 0 && cachedCountries.current.length === 0)
    return (
      <div className="container">
        <div className="loader"></div>
      </div>
    );





  return (
    <>
      <header className="header">
        <input type="text" placeholder="Search for countries..." onChange={handleSearch} />
      </header>
      <div className="container">
        <div className="flags">
          {countries.map((country) => {
            return (
              <Card
                key={country.name.common}
                flag={country.flags.png ?? country.flags.svg}
                name={country.name.common}
                alt={country.flags.alt}
              />
            );
          })}
        </div>
      </div>

    </>
  );
}

export default App;