import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';

const Mapa = ({ lat = 0, long = 0 }) => {
  const mapStyles = {
    width: '100%',
    height: '400px',
    borderRadius: '8px',
  };

  return (
    <>
      <MapContainer center={[lat, long]} zoom={15} style={mapStyles}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[lat, long]} />
      </MapContainer>
    </>
  );
};

Mapa.propTypes = {
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,
};

export default Mapa;
