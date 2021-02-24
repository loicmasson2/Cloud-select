import React, { useEffect, useState } from 'react';
import { Button, Flex, Heading } from 'rebass';
import { Link } from 'react-router-dom';
import ReactMapGL, { Marker } from 'react-map-gl';
import { CoordinatesContext } from './CoordinatesContext';
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

type Coordinates = {
    latitude: number;
    longitude: number;
};

function MapView() {
    const [myCoordinates, setMyCoordinates] = useState({} as Coordinates);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log('Latitude is :', position.coords.latitude);
            console.log('Longitude is :', position.coords.longitude);
            setMyCoordinates({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            } as Coordinates);
        });
    }, []);

    return (
        <CoordinatesContext.Consumer>
            {({ cloudsCoordinates, getBackendQuery }) => (
                <>
                    <Heading fontFamily={'Ubuntu'} as={'h1'} fontSize={7} my={4}>
                        OUR OFFERING
                    </Heading>
                    <Flex justifyContent={'space-around'} alignContent="center">
                        <Link to="/filter/provider">
                            <Button backgroundColor="#093EFF" fontWeight="400" color="#53FF35">
                                Go to provider selection
                            </Button>
                        </Link>
                        <Link to="/filter/region">
                            <Button backgroundColor="#093EFF" fontWeight="400" color="#53FF35">
                                Go to region selection
                            </Button>
                        </Link>
                        <Button
                            backgroundColor="#093EFF"
                            fontWeight="400"
                            color="#53FF35"
                            onClick={() => {
                                getBackendQuery(`/clouds/closest/${myCoordinates.latitude}/${myCoordinates.longitude}`);
                            }}
                        >
                            CLOSEST TO ME
                        </Button>
                        <Button
                            backgroundColor="#093EFF"
                            fontWeight="400"
                            color="#53FF35"
                            onClick={() => {
                                getBackendQuery('/clouds');
                            }}
                        >
                            SEE ALL
                        </Button>
                    </Flex>

                    {cloudsCoordinates && <MapClouds data={cloudsCoordinates}></MapClouds>}
                </>
            )}
        </CoordinatesContext.Consumer>
    );
}

export default MapView;
