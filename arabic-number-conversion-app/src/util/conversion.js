const numbersUnder20AsText = {1:"one", 2:"two", 3:"three", 4:"four", 5:"five", 6:"six", 7:"seven", 8:"eight", 9:"nine", 10:"ten", 11:"eleven", 12:"twelve", 13:"thirteen", 14:"fourteen", 15:"fifteen", 16:"sixteen",17:"seventeen",18:"eighteen",19:"nineteen"}
const decimals = {20:"twenty",30:"thirty", 40:"forty", 50:'fifty', 60:'sixty',70:'seventy',80:'eighty',90:'ninety'};
const tenPowersAsText = ["hundred","thousand","million"]


export function convertArabianNumberToEnglishPhrase(inputArabianNumber) {
    const placeValueArray = splitNumberByPlaceValues(inputArabianNumber);
    let englishPhrase = "";
    switch (placeValueArray.length){
        case 1: //Conversion to 1000
            englishPhrase +=numberConversionTo1000(placeValueArray, 100, tenPowersAsText[0]);
            break;
        case 2://Conversion between 1000 and 1000000
            englishPhrase +=numberConversionBetween1000And1000000(placeValueArray, tenPowersAsText[1]);
            break;
        case 3://Conversion over 1000000
            englishPhrase += numberConversionOver1000000(placeValueArray);
            break;
        default:
            throw new Error('Unknown number: please choose a number less than 1 billion');
    }
    return  addConjunctionsToPhrase(englishPhrase);
}


/**
     * Convert the input number to place values. For example:  1,300,421 to [1000000, 300000, 400, 20, 1]
     * \d       Matches any digit (Arabic numeral). Equivalent to [0-9]. For example, /\d/ or /[0-9]/ matches "2" in "B2 is the suite number".
     * \d+      means match 1 or more digits.
     * ?        Makes quantifiers "lazy"	        example:\d+?	            simple match:1 in 12345
     * (?=…)	Positive lookahead	                example:(?=\d{10})\d{5}	    simple match: 01234 in 0123456789
     * {3}	    Exactly three times	                example:\D{3}	            simple match: ABC
     * (?!…)	Negative lookahead	                example:(?!theatre)the\w+	simple match: theme
     * $	    End of string or end of line
     *          depending on multiline mode.
     *          Many engine-dependent subtleties.	example:.*? the end$	    simple match: this is the end
     * g        global search flag :                the g version will find every occurrence instead of just the first.
 * **/
function splitNumberByPlaceValues (number){
    return number.toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
}


/**
    *Get number name from numbersUnder20AsText and decimals objects.
* **/
function getNameOfSplitNumber(number){
    let result = "";
    let numberInDecimal = findNumberNameInObject(decimals,number);
    let parseSplitNumber = parseInt(splitNumberByPlaceValues(number));
    let remainderNumber = getRemainderOrDivisonFromSplitNumber(parseSplitNumber,10,"%");
    let decimalNumber = parseSplitNumber-remainderNumber;

    //Get exceptional names if the input number smaller than 20
    if(number < 20) {
        result += findNumberNameInObject(numbersUnder20AsText, number);

    }else{
        if(numberInDecimal === ""){
            //Create number name from decimal value name and exceptional name.
            result += findNumberNameInObject(decimals, decimalNumber)+"-";
            result += findNumberNameInObject(numbersUnder20AsText,remainderNumber);
        }
        else{
            result += numberInDecimal;
        }
    }
    return result;
}


/**
    * Convert numbers to English sentences between 0 and 1000.
    * Array looks like: ['121'].
 * **/
function numberConversionTo1000(placeValueArray,divider, placeValueAsText){
    let result ="";
    let parseSplitNumber = parseInt(placeValueArray);
    let remainder  = getRemainderOrDivisonFromSplitNumber(parseSplitNumber, divider, "%");
    let division  = getRemainderOrDivisonFromSplitNumber(parseSplitNumber, divider, "/");

    if(parseSplitNumber>divider) {
        result += getNameOfSplitNumber(division) +" "+ placeValueAsText +" ";
    }
    if(remainder > 0) {
        result += getNameOfSplitNumber(remainder);
    }
    return result;
}


/**
     * Convert numbers to English sentences between 1000 and 1.000.000.
     * Array looks like: ['2', '121'] if the original number is 2.121.
 * **/
function numberConversionBetween1000And1000000(placeValueArray, placeValueAsText){
    let result="";
    let firstElement = placeValueArray[0];
    let secondElement = placeValueArray[1];
    let firstPlaceValueName;
    let secondPlaceValueName = convertArabianNumberToEnglishPhrase(secondElement);
    if(firstElement< 100) {
        firstPlaceValueName = getNameOfSplitNumber(firstElement) +" "+placeValueAsText;}
    else{
        firstPlaceValueName = convertArabianNumberToEnglishPhrase(firstElement)+" "+ placeValueAsText;
    }
    result += firstPlaceValueName +" "+ secondPlaceValueName;
    return result;
}


/**
     * Convert numbers to English sentences over 1.000.000.
     * Array looks like: ['2', '121', '120'] if the original number is 2.121.120.
 * **/
function numberConversionOver1000000(placeValueArray){
    let result="";
    let firstPlaceValue = parseInt(placeValueArray[0]);
    let firstPlaceValueName = getNameOfSplitNumber(firstPlaceValue) +" "+ tenPowersAsText[2];
    let secondPlaceValueName = convertArabianNumberToEnglishPhrase(placeValueArray[1]) + tenPowersAsText[1];
    let thirdPlaceValueName = convertArabianNumberToEnglishPhrase(placeValueArray[2]);
    result += firstPlaceValueName +" "+ secondPlaceValueName +" "+ thirdPlaceValueName;
    return result;
}


/**
     * Search for key-value pairs in objects.
 * **/
function findNumberNameInObject(array, number){
    let result="";
    for (const key in array) {
        if (parseInt(number) === parseInt(key)) {
            result += array[key];
        }
    }
    return result;
}


/**
     * Create remainder and divisor.
 * **/
function getRemainderOrDivisonFromSplitNumber(splitNumber, divider, operator){
    let remainder = splitNumber % divider;
    let divisior = splitNumber / divider;
    return (operator === "%") ?  remainder : divisior;
}


/**
    * Create text to display by adding conjunctions
 * **/
function addConjunctionsToPhrase(phrase){
    const resultPhrase = phrase.split(" ");
    const lastElement = resultPhrase[resultPhrase.length - 1];
    let replacedWord;

    for (let i = 0; i < resultPhrase.length; i++) {
        //add "and" when number greater than 100 and less than 1000
        if(resultPhrase[i] === "hundred" && resultPhrase[i+1] !== "" && resultPhrase[i+1] !== "and" && resultPhrase[i+1] !== "" && resultPhrase[i+1] !== "thousand"){
            replacedWord = resultPhrase[i].concat(" and");
            resultPhrase[i] = replacedWord;
        }
        //add "and" when number greater than 1000
        else if(resultPhrase[i] === "thousand" && lastElement !== "" && resultPhrase[i+1] !== "and" && !resultPhrase.includes("hundred")){
            replacedWord = resultPhrase[i].concat(" and");
            resultPhrase[i] = replacedWord;
        }
    }
    return resultPhrase.join(" ");
}