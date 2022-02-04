import './App.css';
import {useState} from "react";
import Form from "./components/form"
import EnglishPhrase from "./components/englishphrase"


function App() {
    const [arabNumber, setArabNumber] = useState(0);
    const [result, setResult] = useState("");


  return (
      <>
          <div className="App" >
              <h1>My number conversion app</h1>
              <Form arabNumber={arabNumber} setArabNumber={setArabNumber} setResult={setResult}/>
              <EnglishPhrase arabNumber={arabNumber} result={result}/>
          </div>
      </>
  );
}


export default App;
