import {convertArabianNumberToEnglishPhrase} from "./conversion";

/**
    *Tests with given examples.
* **/

describe("Test given examples",()=> {
    test('7', () => {
        const result = convertArabianNumberToEnglishPhrase(7);
        expect(result).toBe("seven");
    })

    test('42', () => {
        const result = convertArabianNumberToEnglishPhrase(42);
        expect(result).toBe("forty-two");
    })

    test('1999', () => {
        const result = convertArabianNumberToEnglishPhrase(1999);
        expect(result).toBe("one thousand nine hundred and ninety-nine");
    })

    test('2001', () => {
        const result = convertArabianNumberToEnglishPhrase(2001);
        expect(result).toBe("two thousand and one");
    })

    test('17999', () => {
        const result = convertArabianNumberToEnglishPhrase(17999);
        expect(result).toBe("seventeen thousand nine hundred and ninety-nine");
    })

    test('342251', () => {
        const result = convertArabianNumberToEnglishPhrase(342251);
        expect(result).toBe("three hundred and forty-two thousand two hundred and fifty-one");
    })

    test('1300420', () => {
        const result = convertArabianNumberToEnglishPhrase(1300420);
        expect(result).toBe("one million three hundred thousand four hundred and twenty");
    })
})


/**
 *Tests due to exceptional cases.
 * **/
describe("Test exceptional cases",()=> {
    test('0', () => {
        const result = convertArabianNumberToEnglishPhrase(0);
        expect(result).toBe("zero");
    })

    test('10', () => {
        const result = convertArabianNumberToEnglishPhrase(10);
        expect(result).toBe("ten");
    })

    test('666', () => {
        const result = convertArabianNumberToEnglishPhrase(666);
        expect(result).toBe("six hundred and sixty-six");
    })

    test('1511', () => {
        const result = convertArabianNumberToEnglishPhrase(1511);
        expect(result).toBe("one thousand five hundred and eleven");
    })

    test('101', () => {
        const result = convertArabianNumberToEnglishPhrase(101);
        expect(result).toBe("one hundred and one");
    })
})

