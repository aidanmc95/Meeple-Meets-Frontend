import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import './style.css'

export default function Place(props) {
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });
  const [zip, setZip] = React.useState("")

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    const newzip = results[0].address_components.filter(component => component.types[0] == 'postal_code')
    setAddress(value);
    setCoordinates(latLng);

    if (newzip[0]) {
      setZip(newzip[0].long_name)

      props.handlePlace(value, latLng, newzip[0].long_name);
    } else {
      props.handlePlace(value, latLng, zip);
    }
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input className="placeInput" {...getInputProps({ placeholder: "Type address" })} />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#FAFAFA" : "#fff",
                };

                return (
                  <div className="suggestion" {...getSuggestionItemProps(suggestion)}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}