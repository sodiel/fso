import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const showInfo = (country) => {
  console.log("showing info...");
  return (
    <>
      <h1>{country.name.official}</h1>
      <p>Capital: {country.capital}</p>
      <h3>Languages</h3>
      {country.languages &&
        Object.entries(country.languages).map(([code, lang]) => (
          <p key={code}>{lang}</p>
        ))}
      <img src={country.flags.svg} style={{ width: "10em" }}></img>
    </>
  );
};
const ShowInfoButton = ({ country }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button key={country.cca2} onClick={() => setShow(!show)}>
        {show ? "hide" : "show"}
      </button>
      {show && showInfo(country)}
    </>
  );
};
function App() {
  const [response, setResponse] = useState(null);
  const [query, setQuery] = useState("");
  const handleChange = (event) => {
    let q = event.target.value;
    setQuery(q);
    console.log(q);
  };

  const getCountries = (query) => {
    return response.filter((country) => country.name.common.includes(query));
  };

  const search = () => {};
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        let data = res.data;
        console.log(data);
        setResponse(data);
      });
  }, []);
  let filtered = [];
  if (response) {
    filtered = getCountries(query);
  }

  return (
    <>
      <form onSubmit={search}>
        <input onChange={handleChange}></input>
      </form>

      {!response ? (
        <p>loading</p>
      ) : filtered.length > 10 ? (
        <p>Too many matches, use another filter</p>
      ) : filtered.length === 1 ? (
        showInfo(filtered[0])
      ) : (
        <ul>
          {filtered.map((country) => (
            <>
              <li key={country.cca2}>{country.name.common}</li>
              <ShowInfoButton country={country}></ShowInfoButton>
            </>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
