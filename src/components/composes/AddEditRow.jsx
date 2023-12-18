// Author: sametbayat
// Dec 13, 2023 6:40 PM

import React, { useState } from 'react';
const AddEditRow = ({
                           inputType = 'text',
                           inputId,
                           // labelText,
                           inputValue,
                           handleInputChange,
                           isRequired = false,
                       }) => {
    // const [title, setTitle] = useState(inputValue || '');
    //
    // // const handleInputChange = (e) => {
    // //     setTitle(e.target.value);
    // //     onInputChange && onInputChange(e.target.value);
    // // };

    return (
        <div className='input-group mb-5'>
            <label className='input-group-text' htmlFor={inputId}>
                {inputId}
            </label>
            <input
                className='form-control col-span-small-6'
                type={inputType}
                name={inputId}
                id={inputId}
                required={isRequired}
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default AddEditRow;
