import React, { useState, useEffect } from 'react';
import { Box, Card, Flex, Heading } from 'rebass';
import axios from 'axios';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import './App.css';
import pin from './pin.png';

function MapClouds(props: any) {
    const [viewport, setViewport] = React.useState({
        longitude: -122.45,
        latitude: 37.78,
        zoom: 14,
    });
    const [showPopup, togglePopup] = React.useState(false);

    const markers = React.useMemo(
        () =>
            props.data.map((city: any) => (
                <Box>
                    <Marker
                        key={city.cloud_name}
                        longitude={city.geo_longitude}
                        latitude={city.geo_latitude}
                        offsetTop={-32}
                        className="tooltip"
                    >
                        <span className="tooltiptext">{city.cloud_name}</span>
                        <img className={'pin'} src={pin} />
                    </Marker>
                </Box>
            )),
        [props.data],
    );

    return (
        <Flex alignItems="center" justifyContent="center" height="100%">
            <ReactMapGL
                {...viewport}
                width="80%"
                height="80%"
                mapStyle="mapbox://styles/mapbox/light-v10"
                mapboxApiAccessToken={
                    'pk.eyJ1IjoibG9pY21hc3NvbiIsImEiOiJjanI4MXN4MWswMXZhNDNtbHN5dzZzanlsIn0.4fw0ARbOrTr88AHvIEaVyw'
                }
                onViewportChange={setViewport}
            >
                {markers}
                {showPopup && (
                    <Popup
                        latitude={37.78}
                        longitude={-122.41}
                        closeButton={true}
                        closeOnClick={false}
                        onClose={() => togglePopup(false)}
                        anchor="top"
                    >
                        <div>You are here</div>
                    </Popup>
                )}
            </ReactMapGL>
        </Flex>
    );
}

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Create an scoped async function in the hook
        async function getClouds() {
            const result = await axios('http://127.0.0.1:5000/clouds');

            setData(result.data.clouds);
        } // Execute the created function directly
        getClouds();
    }, []);

    return (
        <div className="App">
            <Flex
                sx={{
                    color: 'white',
                    minHeight: '100vh',
                    backgroundImage: 'linear-gradient(12.96deg, #093EFF 0%, #53FF35 75.96%)',
                    zIndex: 0,
                    position: 'relative',
                }}
                justifyContent="center"
            >
                <Flex alignItems="center" justifyContent="center">
                    <Card
                        width={1080}
                        height={960}
                        bg="white"
                        color="black"
                        sx={{
                            borderRadius: 20,
                        }}
                    >
                        <Heading mt={4}>CARD</Heading>
                        {data && <MapClouds data={data}></MapClouds>}
                    </Card>
                </Flex>
            </Flex>
        </div>
    );
}

export default App;
