import './App.css';
import {useState} from "react";
import {convertArabianNumberToEnglishPhrase} from "./util/Conversion";

function App() {
    const [arabNumber, setArabNumber] = useState(0);
    const [result, setResult] = useState("");

    const handleChange = (event) => {
        setArabNumber(event.target.value);
    }

    const handleSubmit = (event) => {
        let result = convertArabianNumberToEnglishPhrase(arabNumber);
        setResult(result);
        event.preventDefault();
    }


  return (
      <>
      <h1>My number conversion app</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Arabic number:
          <input type="text" pattern="[0-9]*" name="number"
                 value={arabNumber} onChange={(e) => handleChange(e)}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
          <p>{result}</p>
      </>
  );
}

export default App;
