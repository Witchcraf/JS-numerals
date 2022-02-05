import styled from "styled-components";


function EnglishPhrase({result}){
    return (
            <Result>{result}</Result>
            )
}

const Result = styled.p`
    color: #F5F5DC;
    font-family: 'MATRIX';
    font-weight: 500;
    font-size: 2rem;
    line-height: 1;
`;
export default EnglishPhrase;