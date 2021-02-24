import React, { useEffect, useState } from 'react';
import { Button, Flex, Heading } from 'rebass';
import { Link } from 'react-router-dom';
import MapBox from 'common/components/MapBox';
import { CoordinatesContext } from '../common/context/CoordinatesContext';

type Coordinates = {
    latitude: number;
    longitude: number;
};

function MapView() {
    const [myCoordinates, setMyCoordinates] = useState({} as Coordinates);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setMyCoordinates({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            } as Coordinates);
        });
    }, []);

    return (
        <CoordinatesContext.Consumer>
            {({ cloudsCoordinates, setBackendQuery }) => (
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
                                setBackendQuery(`/clouds/closest/${myCoordinates.latitude}/${myCoordinates.longitude}`);
                            }}
                        >
                            CLOSEST TO ME
                        </Button>
                        <Button
                            backgroundColor="#093EFF"
                            fontWeight="400"
                            color="#53FF35"
                            onClick={() => {
                                setBackendQuery('/clouds');
                            }}
                        >
                            SEE ALL
                        </Button>
                    </Flex>

                    {cloudsCoordinates && <MapBox data={cloudsCoordinates}></MapBox>}
                </>
            )}
        </CoordinatesContext.Consumer>
    );
}

export default MapView;
