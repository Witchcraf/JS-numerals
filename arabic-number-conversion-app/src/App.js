import './App.css';
import {useState} from "react";
import Form from "./components/form"
import EnglishPhrase from "./components/englishphrase"
import Matrix from "./components/matrixbackground";


function App() {
    const [arabNumber, setArabNumber] = useState(0);
    const [result, setResult] = useState("");

  return (
      <>
          <div className="App" >
              <Matrix />
              <h1 style={{color:"#F5F5DC", fontFamily: 'MATRIX', fontSize:"50px", marginBottom: "50px"}}>The one conversion app</h1>
              <Form arabNumber={arabNumber} setArabNumber={setArabNumber} setResult={setResult}/>
              <EnglishPhrase result={result}/>
          </div>
      </>
  );
}
export default App;
