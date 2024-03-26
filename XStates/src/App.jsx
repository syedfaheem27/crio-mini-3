import { useEffect, useState } from "react";

const COUNTRY_API = "https://crio-location-selector.onrender.com/countries";
const STATES_API = "https://crio-location-selector.onrender.com/country=%7BcountryName%7D/states";
const CITIES_API = "https://crio-location-selector.onrender.com/country=%7BcountryName%7D/state=%7BstateName%7D/cities"

const Base_Url = "https://crio-location-selector.onrender.com"

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const fetchCountries = async () => {
    try {
      const res = await fetch(`${Base_Url}/countries`);
      const data = await res.json();
      setCountries(data)

    } catch (err) {
      console.log(err)
    }

  };

  const fetchStates = async () => {
    try {
      const res = await fetch(`${Base_Url}/country=${selectedCountry}/states`);
      const data = await res.json();
      setStates(data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchCities = async () => {
    try {
      const res = await fetch(`${Base_Url}/country=${selectedCountry}/state=${selectedState}/cities`);
      const data = await res.json();
      setCities(data);
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    fetchCountries()
  }, []);

  useEffect(() => {
    if (!selectedCountry)
      return;

    fetchStates()

  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedState)
      return;

    fetchCities();
  }, [selectedState])


  return (
    <>
      <header>
        <h1>
          Select Location
        </h1>
      </header>
      <select name="countries" id="countries" value={selectedCountry} onChange={e => {
        setSelectedCountry(e.target.value);
      }}>
        <option value="" disabled>Select Country</option>
        {
          countries.map((country, id) => {
            return <option key={id} value={country}>{country}</option>
          })
        }
      </select>

      <select name="states" id="states" value={selectedState} disabled={!selectedCountry} onChange={e => {
        setSelectedState(e.target.value)
      }}>
        <option value="" disabled>Select State</option>
        {
          states.map((state, id) => {
            return <option key={id} value={state}>{state}</option>
          })
        }
      </select>

      <select name="cities" id="cities" value={selectedCity} disabled={!selectedState} onChange={e => {
        setSelectedCity(e.target.value);
      }}>
        <option value="" disabled>Select city</option>
        {
          cities.map((city, id) => {
            return <option key={id} value={city}>{city}</option>
          })
        }
      </select>


      {
        selectedCountry && selectedState && selectedCity &&
        <div className="place">
          You selected <span className="city">{selectedCity}</span>, <span className="state_country">{selectedState}, {selectedCountry}</span>
        </div>
      }

    </>
  )
}

export default App
