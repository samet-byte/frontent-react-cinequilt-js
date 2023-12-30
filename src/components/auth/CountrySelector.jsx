import React from 'react';
import Select from 'react-select';
import Constants from "../../common/Constants";

const CountrySelector = ({ selectedCountry, onChange }) => {
    // const countryOptions = [
    //     { value: 'tr', label: '🇹🇷 Turkey' },
    //     { value: 'us', label: '🇺🇸 United States' },
    //     { value: 'ca', label: '🇨🇦 Canada' },
    //     { value: 'gb', label: '🇬🇧 United Kingdom' },
    //     { value: 'au', label: '🇦🇺 Australia' },
    //     { value: 'de', label: '🇩🇪 Germany' },
    //     { value: 'fr', label: '🇫🇷 France' },
    //     { value: 'jp', label: '🇯🇵 Japan' },
    //     { value: 'in', label: '🇮🇳 India' },
    //     { value: 'br', label: '🇧🇷 Brazil' },
    //     { value: 'mx', label: '🇲🇽 Mexico' },
    //     { value: 'cn', label: '🇨🇳 China' },
    //     { value: 'ru', label: '🇷🇺 Russia' },
    //     { value: 'za', label: '🇿🇦 South Africa' },
    //     { value: 'kr', label: '🇰🇷 South Korea' },
    //     { value: 'se', label: '🇸🇪 Sweden' },
    //     { value: 'es', label: '🇪🇸 Spain' },
    //     { value: 'it', label: '🇮🇹 Italy' },
    //     { value: 'nl', label: '🇳🇱 Netherlands' },
    //     { value: 'pl', label: '🇵🇱 Poland' },
    //     { value: 'ir', label: '🇮🇷 Iran' },
    //     { value: 'nk', label: '🇰🇵 North Korea' },
    // ];

    return (
        <Select
            value={selectedCountry}
            onChange={onChange}
            options={Constants.COUNTRIES}
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
                    color: state.isSelected ? '#000000' : '#000000cc',
                    // color: state.isSelected ? '#000000' : '#ffffff',
                    backgroundColor: state.isSelected ? '#ffffff' : 'transparent',
                    '&:hover': {
                        color: '#ffffff',
                        backgroundColor: '#656565',
                    },
                }),
            }}
        />
    );
};

export default CountrySelector;
