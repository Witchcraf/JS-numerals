const numbersWithWords = {1:"one", 2:"two", 3:"three", 4:"four", 5:"five", 6:"six", 7:"seven",
                            8:"eight", 9:"nine", 10:"ten", 11:"eleven", 12:"twelve", 13:"thirteen", 14:"fourteen", 15:"fifteen"}

export function convertArabianNumberToEnglishPhrase(number){
    let digitsArray = getDigitsFromArabianNumber(number);
    if(digitsArray.length === 2){
        return getPhraseFromNumberUnderHundred(number, digitsArray)
    }
    else if(digitsArray.length >2 && digitsArray.length<5)

   return getDigitNameFromSpittedNumber(parseInt(number));
}

function getDigitNameFromSpittedNumber(number){
    for (const key in numbersWithWords) {
        if(number === parseInt(key)){
            return numbersWithWords[key];
        }
    }
}
function getDigitsFromArabianNumber(n) {
    return Array.from(String(n), Number);
}

function getPhraseFromNumberUnderHundred(number, digitsArray){
    if(digitsArray[0] ===1){
        if(digitsArray[1] > 5) {
            return getDigitNameFromSpittedNumber(digitsArray[1]) + "teen";
        }
        else{
            return getDigitNameFromSpittedNumber(parseInt(number));
        }
    }
    else if(digitsArray[0] === 2){
        return "twenty-" + getDigitNameFromSpittedNumber(digitsArray[1]);
    }
    else {
        return getDigitNameFromSpittedNumber(digitsArray[0]) + "ty-" + getDigitNameFromSpittedNumber(digitsArray[1]);
    }
}