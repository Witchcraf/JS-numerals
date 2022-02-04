import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('basic user flow',async ()=>{
    render(<App />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, {target:{value:7}});
    const form = screen.getByTestId('conversionform');
    fireEvent.submit(form);
    const text = await screen.findByText("7 = seven");
    expect(text).toBeInTheDocument();
})

test('ontest event fired', ()=>{
    const testHandler = jest.fn();
    render(<App onTestEvent={testHandler} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, {target:{value:7}});
    const form = screen.getByTestId('conversionform');
    fireEvent.submit(form);
    expect(testHandler).toBeCalled();
})

// empty form, issue handling etc.