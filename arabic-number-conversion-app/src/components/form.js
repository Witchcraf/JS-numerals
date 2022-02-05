import {convertArabianNumberToEnglishPhrase} from "../util/conversion";
import styled, {keyframes} from "styled-components";
import {TextField} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";


function Form({arabNumber, setArabNumber, setResult}){
    //helper function to add style to material ui textfield
    const useStyles = makeStyles(theme => ({
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: "30ch",
            height: "6ch",
            backgroundColor: "#F5F5DC",
            borderRadius:"15px",
            "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderRadius: "15px",
                    borderColor: "#000fff"
                }
            }
            }
    }));
    const classes = useStyles();


    //set arabNumber in usestate
    const handleChange = (event) => {
        setArabNumber(event.target.value);
    }


    //convert number to phrase and set the result in usestate
    const handleSubmit = (event) => {
        let result = convertArabianNumberToEnglishPhrase(arabNumber);
        setResult(result);
        event.preventDefault();
    }


    return (
        <form onSubmit={handleSubmit} data-testid="conversionform">
            <TextField id="outlined-basic"
                       variant="outlined"
                       type="number"
                       className={classes.textField}
                       inputProps={{ pattern: "[0-9]*",min:0,max:1000000000}}
                       value={arabNumber} onChange={(e) => handleChange(e)}
                       required/>
            <br/>
            <Button>Convert to Phrase!</Button>
        </form>
    )
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
    padding: 13px 13px;
    color: black;
    font-weight: 600;
    text-transform: uppercase;
    background: #66CC00;
    border: none;
    border-radius: 15px;
    outline: 0;
    cursor: pointer;
    margin-top: 70px;
    margin-bottom: 50px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-out;
    :hover {
    background: #FFC0CB;
    animation: ${jump} 0.2s ease-out forwards;
    }
`;
export default Form;