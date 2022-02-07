import {render, screen, fireEvent, getByTestId} from '@testing-library/react';
import Form from "./components/form";
import EnglishPhrase from "./components/englishphrase";
import React from 'react';
import {mount} from 'enzyme';
import Title from "./components/header";


describe("Test form elements",()=> {
    test('Test button name', () => {
        render(<Form data-testid='conversionform'/>);
        expect(screen.getByRole('button')).toHaveTextContent('Convert to Phrase!')
    });

    test('Test change the value of an input', () => {
        const {getByTestId} = render(<input data-testid='textfield'/>);
        const element = getByTestId('textfield');
        fireEvent.change(element, {target: {value: 7}});
        expect(element).toHaveValue("7");
    });
})


describe("Test components rendering",()=>{
    test('Header component render title', () => {
        const titleTest = "The one conversion app";
        const wrapper = mount(
            <Title title={titleTest} />
        );
        expect(wrapper.text()).toBe('The one conversion app');
    });

    test('EnglishPhrase component render result inside it', () => {
        const resultTest = "seven";
        const wrapper = mount(
            <EnglishPhrase result={resultTest} />
        );
        expect(wrapper.text()).toBe('seven');
    });
})


