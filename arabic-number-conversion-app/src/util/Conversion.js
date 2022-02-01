const numbersWithWordsBelow20 = {1:"one", 2:"two", 3:"three", 4:"four", 5:"five", 6:"six", 7:"seven", 8:"eight", 9:"nine",
    10:"ten", 11:"eleven", 12:"twelve", 13:"thirteen", 14:"fourteen", 15:"fifteen", 16:"sixteen",17:"seventeen",18:"eighteen",19:"nineteen"}
const decimals = {20:"twenty",30:"thirty", 40:"forty", 50:'fifty', 60:'sixty',70:'seventy',80:'eighty',90:'ninety'};
const words = ["hundred","thousand", "million"]

export function convertArabianNumberToEnglishPhrase(number) {
    const arrayOfSplittedNumber =splittedNumber(number);
    console.log(arrayOfSplittedNumber)
    let remainderInMIllion;
    let divideMIllion;
    let remainderInThousand;
    let divideThousand;
    let remainderInHundred;
    let divideInHUndred;
    let result = "";
    for (let i = 0; i < arrayOfSplittedNumber.length; i++) {
        remainderInMIllion = arrayOfSplittedNumber[i] % 1000000;
        divideMIllion = arrayOfSplittedNumber[i] / 1000000;
        remainderInThousand = arrayOfSplittedNumber[i] % 1000;
        divideThousand= arrayOfSplittedNumber[i] / 1000;
        remainderInHundred = arrayOfSplittedNumber[i] % 100;
        divideInHUndred= arrayOfSplittedNumber[i] / 100;
        if(arrayOfSplittedNumber[i]===0){
            continue;
        }
        if(remainderInMIllion === 0){
            result += getDigitNameFromSpittedNumber(divideMIllion) + " "+words[2] + " ";
        }
        else if(remainderInThousand ===0){
            if(divideThousand<100){
                result += getDigitNameFromSpittedNumber(divideThousand) + " "+words[1]+" ";
            }
            else{
                let div = divideThousand / 100;
                result += getDigitNameFromSpittedNumber(div) + " "+words[0] +" "+words[1]+" ";
            }
        }
        else if(remainderInHundred ===0){
            result += getDigitNameFromSpittedNumber(divideInHUndred) + " "+words[0]+" and ";
        }
        else if(arrayOfSplittedNumber[i] < 100) {
            result += getDigitNameFromSpittedNumber(arrayOfSplittedNumber[i]);
        }

    }
    console.log(result)
    return result;

}


function splittedNumber (number, arr = [], m = 1){
    if (number) {
        return splittedNumber(Math.floor(number / 10), [m * (number % 10)].concat(arr), m * 10);
    }
    return arr;
}

function getDigitNameFromSpittedNumber(number){
    let result;
    if(number < 20) {
        for (const key in numbersWithWordsBelow20) {
            if (number === parseInt(key)) {
                result= numbersWithWordsBelow20[key];
            }
        }
    }else{
        for (const key in decimals) {
            if (number === parseInt(key)) {
                result=decimals[key]+"-";
            }
        }
    }
    return result;
}