import React from 'react';
import { Flex, Heading } from 'rebass';
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

function MapView() {
    return (
        <CoordinatesContext.Consumer>
            {({ coordinates }) => (
                <>
                    <Heading fontFamily={'Ubuntu'} as={'h1'} fontSize={7} mt={4}>
                        OUR OFFERING
                    </Heading>
                    <Flex justifyContent={'space-around'} alignContent="center">
                        <Link to="/filter/provider">Go to provider selection</Link>
                        <Link to="/filter/region">Go to region selection</Link>
                    </Flex>

                    {coordinates && <MapClouds data={coordinates}></MapClouds>}
                </>
            )}
        </CoordinatesContext.Consumer>
    );
}

export default MapView;
