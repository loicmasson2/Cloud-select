import React, { useState, useEffect } from 'react';
import { Card, Flex, Heading } from 'rebass';
import axios from 'axios';
import ReactMapGL, { Marker } from 'react-map-gl';
import './App.css';
import pin from './pin.png';

function MapClouds(props: any) {
    const [viewport, setViewport] = React.useState({
        longitude: 24.90368,
        latitude: 60.158771,
        zoom: 5,
    });

    const markers = React.useMemo(
        () =>
            props.data.map((city: any) => (
                <Marker
                    key={city.cloud_name}
                    longitude={city.geo_longitude}
                    latitude={city.geo_latitude}
                    offsetTop={-32}
                    className="tooltip"
                >
                    <span className="tooltiptext">{city.cloud_name}</span>
                    <img className={'pin'} src={pin} alt="pin" />
                </Marker>
            )),
        [props.data],
    );

    return (
        <Flex alignItems="center" justifyContent="center" height="90%">
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
            </ReactMapGL>
        </Flex>
    );
}

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getClouds() {
            const result = await axios('http://127.0.0.1:5000/clouds');

            setData(result.data.clouds);
        }
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
                        <Heading fontFamily={'Ubuntu'} as={'h1'} fontSize={7} mt={4}>
                            OUR OFFERING
                        </Heading>
                        {data && <MapClouds data={data}></MapClouds>}
                    </Card>
                </Flex>
            </Flex>
        </div>
    );
}

export default App;
