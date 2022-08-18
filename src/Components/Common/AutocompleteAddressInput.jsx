import React, { useEffect } from 'react';
import { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const AutocompleteAddressInput = ({ AddAddressHandler }) => {
  const [searchText, setSearchText] = useState('');
  const [address, setAddress] = useState({
    location: '',
    coordinates: {
      longitude: 0,
      latitude: 0,
    },
  });

  useEffect(() => {
    AddAddressHandler(address);
  }, [address]);

  const handleChange = (newAddress) => {
    setSearchText(newAddress);
  };

  const handleSelect = async (address) => {
    const temp = {};
    const results = await geocodeByAddress(address);
    const { lat, lng } = await getLatLng(results[0]);
    temp.location = results[0].formatted_address;
    temp.coordinates = {
      longitude: lng,
      latitude: lat,
    };
    await setSearchText(results[0].formatted_address);
    setAddress(temp);
  };
  return (
    <PlacesAutocomplete
      value={searchText}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({
        getInputProps,
        suggestions,
        getSuggestionItemProps,
        loading,
      }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'form-control',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AutocompleteAddressInput;
