import './App.css';
import {useState} from "react";
import Form from "./components/form"
import EnglishPhrase from "./components/englishphrase"
import Title from "./components/header"
import Matrix from "./components/matrixbackground";


function App() {
    const [arabNumber, setArabNumber] = useState(0);
    const [result, setResult] = useState("");

    return (
            <>
              <div className="App" >
                  <Matrix />
                  <Title title="The one conversion app"/>
                  <Form arabNumber={arabNumber} setArabNumber={setArabNumber} setResult={setResult}/>
                  <EnglishPhrase result={result}/>
              </div>
            </>
            );
    }
export default App;
