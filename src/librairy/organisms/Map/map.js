import { v4 as uuid } from 'uuid';
import ReactMapGL, { Marker } from 'react-map-gl';
import { useState } from 'react';

export const Map = ({ positions, token }) => {
  const [viewportState, setViewportState] = useState({
    width: '100%',
    height: '50vh',
    longitude: 2.19727,
    latitude: 46.51352,
    zoom: 5
  });

  const [visible, setVisibility] = useState(false)

  const style = {
    position: 'absolute',
    top: '-2rem',
    padding: '0.5rem',
    backgroundColor: 'white',
    display: visible ? 'block' : 'none',
  }
  
  const onMarkerClick = (e) => {
    setVisibility(!visible);
    e.stopPropagation();
  };

    return (
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken={token}
        onViewportChange={(newViewport) => setViewportState({...newViewport})}
        {...viewportState}
      >
      {
        positions.map(position => <Marker
          key={uuid()}
          longitude={position.gps.longitude}
          latitude={position.gps.latitude}
          > 
            <div onClick={onMarkerClick} style={{position: 'relative'}} className="icon-mini">
              <img src='./images/pin.png' alt="Ici" loading="lazy" title={position.company} />
              <span style={style}>{position.company}</span>
            </div>
          </Marker> )
      }
      </ReactMapGL>
    );
}