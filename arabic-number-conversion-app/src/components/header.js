import styled from "styled-components";


function Title({title}){
    return (
            <MainTitle>{title} </MainTitle>
            )
}

const MainTitle = styled.h1`
    color: #F5F5DC;
    font-family: 'MATRIX';
    font-size: 4rem;
    line-height: 1;
`;
export default Title;