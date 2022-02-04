import './App.css';
import {useState} from "react";
import {convertArabianNumberToEnglishPhrase} from "./util/conversion";
import styled,{keyframes} from "styled-components";


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
          <div className="App" >
              <h1>My number conversion app</h1>
              <form onSubmit={handleSubmit} data-testid="conversionform">
                <label>
                  Arabic number:
                  <input type="text" pattern="[0-9]*" name="number"
                         value={arabNumber} onChange={(e) => handleChange(e)}/>
                </label>
                  <br/>
                  <Button>Convert to Phrase!</Button>
              </form>
              <div className="result">
                  <h3>Converted Number:</h3>
                  <p>{arabNumber +" = "+result}</p>
              </div>
          </div>
      </>
  );

}
const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;

const Button = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #FF6666;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: #66CC00;
    animation: ${jump} 0.2s ease-out forwards;
  }
`;

export default App;
