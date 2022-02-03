const numbersUnder20AsText = {1:"one", 2:"two", 3:"three", 4:"four", 5:"five", 6:"six", 7:"seven", 8:"eight", 9:"nine", 10:"ten", 11:"eleven", 12:"twelve", 13:"thirteen", 14:"fourteen", 15:"fifteen", 16:"sixteen",17:"seventeen",18:"eighteen",19:"nineteen"}
const decimals = {20:"twenty",30:"thirty", 40:"forty", 50:'fifty', 60:'sixty',70:'seventy',80:'eighty',90:'ninety'};
const tenPowersAsText = ["hundred","thousand","million"]
let arrayOfSplittedNumber;
let remainderMillion;
let divisonMillion;
let remainderThousand;
let divisionThousand;
let remainderHundred;
let divisionHundred;

export function convertArabianNumberToEnglishPhrase(inputArabianNumber) {
    const placeValueArray = splitNumberByPlaceValues(inputArabianNumber);
    let resultPhrase = "";
    let resultEnglishPhrase = "";
    //ConversionTo1000
    if(placeValueArray.length < 2){
        resultPhrase +=numberConversionTo1000(inputArabianNumber);
    }
    //ConversionBetween1000And1000000
    else if(placeValueArray.length === 2){
        resultPhrase +=numberConversionBetween1000And1000000(placeValueArray);

    }
    //ConversionOver1000000
    else if(placeValueArray.length === 3){
        resultPhrase += numberConversionOver1000000(placeValueArray);
    }

    return  addConjunctionsToResultPhrase(resultPhrase);

}


function splitNumberByRealValue (number, arr = [], m = 1){
    if (number) {
        return splitNumberByRealValue(Math.floor(number / 10), [m * (number % 10)].concat(arr), m * 10);
    }
    return arr;
}

function splitNumberByPlaceValues (number){
    return number.toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
}

function getNameOfSplitNumber(splitNumber){
    let result = "";
    if(splitNumber < 20) {
        result += findNumberNameInLists(numbersUnder20AsText, splitNumber);

    }else if(splitNumber>19){
        let numberInDecimal = findNumberNameInLists(decimals,splitNumber);
        if(numberInDecimal === ""){
            let split = splitNumberByRealValue(splitNumber)
            result += findNumberNameInLists(decimals, split[0])+" ";
            result += findNumberNameInLists(numbersUnder20AsText,split[1]);
        }
        else{
            result += numberInDecimal+" ";
        }
    }
    return result;
}

function numberConversionTo1000(inputArabianNumber){
    let result ="";
    arrayOfSplittedNumber = splitNumberByRealValue(inputArabianNumber);
    if(inputArabianNumber<100){
        result += getNameOfSplitNumber(inputArabianNumber);
    }
    else {
        for (let i = 0; i < arrayOfSplittedNumber.length; i++) {
            remainderMillion = getRemainderOrDivisonFromSplitNumber(arrayOfSplittedNumber[i], 1000000, "%")
            divisonMillion = getRemainderOrDivisonFromSplitNumber(arrayOfSplittedNumber[i], 1000000, "/")
            remainderThousand = getRemainderOrDivisonFromSplitNumber(arrayOfSplittedNumber[i], 1000, "%")
            divisionThousand = getRemainderOrDivisonFromSplitNumber(arrayOfSplittedNumber[i], 1000, "/")
            remainderHundred = getRemainderOrDivisonFromSplitNumber(arrayOfSplittedNumber[i], 100, "%")
            divisionHundred = getRemainderOrDivisonFromSplitNumber(arrayOfSplittedNumber[i], 100, "/")
            if (arrayOfSplittedNumber[i] === 0) {
                continue;
            }
            if (remainderMillion === 0) {
                result += getNameOfSplitNumber(divisonMillion)+ " " + tenPowersAsText[2] ;
            } else if (remainderThousand === 0) {
                if (divisionThousand < 100) {
                    result += getNameOfSplitNumber(divisionThousand)+" " + tenPowersAsText[1];
                } else {
                    let div = divisionThousand / 100;
                    result += getNameOfSplitNumber(div) + " " +tenPowersAsText[0]+" "+ tenPowersAsText[1] ;
                }
            } else if (remainderHundred === 0) {
                result += getNameOfSplitNumber(divisionHundred) + " " + tenPowersAsText[0] +" " ;
            } else if (arrayOfSplittedNumber[i] < 100) {

                result += getNameOfSplitNumber(arrayOfSplittedNumber[i]);
            }
        }
    }
    return result;
}

function numberConversionBetween1000And1000000(placeValueArray){
    let result="";
    let firstPlaceValue = parseInt(placeValueArray[0]);
    let firstPlaceValueName;
    let secondPlaceValueName;
    if(firstPlaceValue < 100) {
        firstPlaceValueName = getNameOfSplitNumber(firstPlaceValue) + " " +tenPowersAsText[1];}
    else{
        firstPlaceValueName = convertArabianNumberToEnglishPhrase(placeValueArray[0])+" "+ tenPowersAsText[1];
    }
    secondPlaceValueName = convertArabianNumberToEnglishPhrase(placeValueArray[1])
    result += firstPlaceValueName + " " + secondPlaceValueName;
    return result;
}

function numberConversionOver1000000(placeValueArray){
    let result="";
    let firstPlaceValue = parseInt(placeValueArray[0]);
    let firstPlaceValueName = getNameOfSplitNumber(firstPlaceValue) + " " + tenPowersAsText[2];
    let secondPlaceValueName = convertArabianNumberToEnglishPhrase(placeValueArray[1]);
    let thirdPlaceValueName = convertArabianNumberToEnglishPhrase(placeValueArray[2]);
    result += firstPlaceValueName +" " + secondPlaceValueName + " " + thirdPlaceValueName;
    return result;
}

function findNumberNameInLists(array, number){
    let result="";
    for (const key in array) {
        if (parseInt(number) === parseInt(key)) {
            result += array[key];
        }
    }
    return result;
}


function getRemainderOrDivisonFromSplitNumber(splitNumber, divider, operator){
    let remainder = splitNumber % divider;
    let division = splitNumber / divider;
    return (operator === "%") ?  remainder : division;

}

function addConjunctionsToResultPhrase(resultPhrase){
    console.log(resultPhrase)
    let a = resultPhrase.split(" ");
    let lastElement = a[a.length - 1];
    let replacedWord;


    for (let i = 0; i < a.length; i++) {
        let slicedWord = a[i].slice(-2);
        if(a[i] === "hundred" && lastElement !== "" && a[i+1] !== "and"){
            replacedWord = a[i].concat(" and ");
            a[i] = replacedWord;

        }

        if(a[i] === "thousand" && lastElement !== "" && a[i+1] !== "and" && !a.includes("hundred")){
            replacedWord = a[i].concat(" and ");
            a[i] = replacedWord;

        }

        //add"-"
        if(slicedWord === "ty" && lastElement !== ""){
            replacedWord = a[i].concat("-");
            a[i] = replacedWord;

        }
    }

    console.log(a)
    return a.join(" ");
}