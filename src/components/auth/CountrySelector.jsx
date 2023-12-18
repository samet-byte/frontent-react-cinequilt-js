import React from 'react';
import Select from 'react-select';

const CountrySelector = ({ selectedCountry, onChange }) => {
    // You can replace this array with a list of countries from an API or a data file
    const countryOptions = [
        { value: 'tur', label: 'Türkiye' },
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'gb', label: 'United Kingdom' },
        { value: 'au', label: 'Australia' },
        { value: 'de', label: 'Germany' },
        { value: 'fr', label: 'France' },
        { value: 'jp', label: 'Japan' },
        { value: 'in', label: 'India' },
        { value: 'br', label: 'Brazil' },
        { value: 'mx', label: 'Mexico' },
        { value: 'cn', label: 'China' },
        { value: 'ru', label: 'Russia' },
        { value: 'za', label: 'South Africa' },
        { value: 'kr', label: 'South Korea' },
        { value: 'se', label: 'Sweden' },
        { value: 'es', label: 'Spain' },
        { value: 'it', label: 'Italy' },
        { value: 'nl', label: 'Netherlands' },
        { value: 'pl', label: 'Poland' },
        { value: 'ir', label: 'Iran' },
        { value: 'nk', label: 'North Korea' },
    ];

    return (
        <Select
            value={selectedCountry}
            onChange={onChange}
            options={countryOptions}
            placeholder="Select Country"
            styles={{
                control: (provided) => ({
                    ...provided,
                    color: '#000000cc',
                    backgroundColor: '#ffffff',
                }),
                menu: (provided) => ({
                    ...provided,
                    zIndex: 9999,
                    overflow: 'visible',
                }),
                option: (provided, state) => ({
                    ...provided,
                    // color: '#000000cc', // Adjust the colors as needed
                    color: state.isSelected ? '#000000' : '#000000cc',
                    // color: state.isSelected ? '#000000' : '#ffffff', // Adjust the colors as needed
                    backgroundColor: state.isSelected ? '#ffffff' : 'transparent', // Adjust the background color when selected
                    '&:hover': {
                        color: '#ffffff', // Change the color on hover
                        backgroundColor: '#656565', // Change the background color on hover
                    },
                }),
            }}
        />
    );
};

export default CountrySelector;
