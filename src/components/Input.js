import React from 'react';

export default function Input({ inputId, closable, onChange, text, onClose }) {

    return (
        <div className='closable-input-box'>
            <input className='closable-input' value={text} onChange={(e) => onChange(e, inputId)} />
            {closable && <button className='close-button' onClick={(e) => onClose(inputId)}>-</button>}
        </div>
    )
}
