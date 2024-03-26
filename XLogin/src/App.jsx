import { useState } from "react"

const VALID_CREDENTIALS = {
  user: "user",
  password: "password"
}



function App() {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [msg, setMsg] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const user = data.get('user');
    const pass = data.get('pass');

    if (!user || !pass)
      return console.log("Username or Password required!")

    if (user !== VALID_CREDENTIALS.user || pass !== VALID_CREDENTIALS.password)
      return setMsg("Invalid username or password");

    setIsLoggedIn(true);
    setMsg("")
  }

  return <>
    <header>
      <h1>Login Page</h1>
    </header>
    {
      msg && <h3>Invalid username or password</h3>
    }

    {
      !loggedIn && <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user-name">Username:</label>
          <input type="text" id="user-name" name="user" required />
        </div>
        <div>
          <label htmlFor="pass">Password:</label>
          <input type="password" id="pass" name="pass" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    }
    {
      loggedIn && <h3>Welcome, user!</h3>
    }

  </>
}

export default App
