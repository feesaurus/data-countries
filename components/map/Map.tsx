import { MapContainer, Marker, TileLayer, Popup, useMapEvent, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import L from "leaflet";
import { useEffect } from 'react';

function ResetCenterView(props: any) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition[0], selectPosition[1]),
        map.getZoom(),
        {
          animate: true
        }
      )
    }
  }, [selectPosition]);

  return null;
}

export default function Map(props: any) {
  const { position, marker, zoom, name } = props;

  const MapAutoZoom = () => {
    const data = position;
    const map = useMapEvent('click', () => {
      map.setView(data, map.getZoom())
    })
    return null
  }

  return (
    <MapContainer
      style={{ height: '100%', width: '100%', position: "fixed" }}
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <MapAutoZoom />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        marker.length !== 0 &&
        <Marker position={marker}>
          <Popup>
            {name}
          </Popup>
        </Marker>
      }
      <ResetCenterView selectPosition={position} />
    </MapContainer>
  );
};