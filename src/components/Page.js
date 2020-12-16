import React, { useState } from 'react';
import Input from './Input';

let id = 1;
const idGenerator = () => {
    return id++;
}

const firstInput = { inputId: idGenerator().toString(), closable: false, text: '' }

export default function Page() {

    const [inputs, setInputs] = useState([firstInput]);

    function handleChange(e, inputId) {
        let inputsCopy = [...inputs];
        const changedInputIndex = inputsCopy.findIndex(input => input.inputId === inputId);
        const newChangedInput = { ...inputsCopy[changedInputIndex] };
        newChangedInput.text = e.target.value;
        if (newChangedInput.text !== '') {
            newChangedInput.closable = true;
            if (changedInputIndex === inputsCopy.length - 1) {
                inputsCopy = [...inputsCopy, { inputId: idGenerator().toString(), closable: false, text: '' }];
            }
            inputsCopy.splice(changedInputIndex, 1, newChangedInput);
        } else {
            if (changedInputIndex === inputsCopy.length - 2) {
                newChangedInput.closable = false;
                inputsCopy.splice(changedInputIndex, 1, newChangedInput);
                inputsCopy.splice(changedInputIndex + 1, 1);
            } else {
                inputsCopy.splice(changedInputIndex, 1);
            }
        }
        setInputs(inputsCopy);
    }

    function handleClose(inputId) {
        const inputsCopy = [...inputs];
        const closedInputIndex = inputsCopy.findIndex(input => input.inputId === inputId);
        inputsCopy.splice(closedInputIndex, 1);
        setInputs(inputsCopy);
    }

    return (
        <div className='page'>
            {inputs.map(input =>
                <Input
                    key={input.inputId}
                    inputId={input.inputId}
                    closable={input.closable}
                    onChange={handleChange}
                    text={input.text}
                    onClose={handleClose}
                />
            )}
        </div>
    )
}