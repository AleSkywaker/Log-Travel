import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './api';
const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 40.414737693035875,
    longitude: -3.6847972869873047,
    zoom: 14,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
      console.log(logEntries);
    })();
  }, []);

  const showAddMarkerPopup = (e) => {
    const [long, lat] = e.lngLat;
    console.log(e);
    setAddEntryLocation({
      long,
      lat,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle={'mapbox://styles/alexskywalker/ckackalgq6fyh1iph8a83eqfm'}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map((entry, index) => (
        <>
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
            // offsetLeft={-15}
            // offsetTop={-30}
          >
            <div
              onClick={() => {
                setShowPopup({
                  // ...showPopup,
                  [entry._id]: true,
                });
                console.log(showPopup[entry._id]);
              }}
            >
              <img
                src='https://i.imgur.com/y0G5YTX.png'
                className='markerImg'
                alt='ping'
                style={{
                  height: `${2 * viewport.zoom}px`,
                  width: `${2 * viewport.zoom}px`,
                }}
              />
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              sortByDepth={true}
              onClose={() =>
                setShowPopup({
                  // ...showPopup,
                  // [entry._id]: false,
                })
              }
              anchor='top'
            >
              <div className='popup'>
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>Visitado en : {new Date(entry.createdAt).toLocaleDateString()}</small>
              </div>
            </Popup>
          ) : null}
        </>
      ))}

      {addEntryLocation ? (
        <>
          <Marker latitude={addEntryLocation.lat} longitude={addEntryLocation.long}>
            <div>
              <img
                src='https://i.imgur.com/y0G5YTX.png'
                className='markerImg'
                alt='ping'
                style={{
                  height: `${2 * viewport.zoom}px`,
                  width: `${2 * viewport.zoom}px`,
                }}
              />
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.lat}
            longitude={addEntryLocation.long}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            sortByDepth={true}
            onClose={() => setAddEntryLocation(null)}
            anchor='top'
          >
            <div className='popup'>
              <h3>Add your new log entry</h3>
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};

export default App;
