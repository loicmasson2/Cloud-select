import React, { useEffect, useState } from 'react';
import { Flex } from 'rebass';
import MapBox from 'common/components/MapBox';
import PrimaryButton from 'common/components/PrimaryButton';
import LinkButton from 'common/components/LinkButton';
import H1 from 'common/components/H1';
import { CoordinatesContext } from 'common/context/CoordinatesContext';

type Coordinates = {
    latitude: number;
    longitude: number;
};

const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 6000, // desktop usage so not likely to move around
};
function MapView() {
    const [myCoordinates, setMyCoordinates] = useState({} as Coordinates);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setMyCoordinates({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                } as Coordinates);
            },
            (error) => {
                console.error(error);
            },
            options,
        );
    }, []);

    return (
        <CoordinatesContext.Consumer>
            {({ cloudsCoordinates, setBackendQuery }) => (
                <>
                    <H1>Our offering</H1>
                    <Flex justifyContent={'space-around'} alignContent="center">
                        <LinkButton to="/filter/provider">Go to provider selection</LinkButton>
                        <LinkButton to="/filter/region">Go to region selection</LinkButton>
                        {myCoordinates.latitude && myCoordinates.longitude && (
                            <PrimaryButton
                                onClick={() => {
                                    setBackendQuery(
                                        `/clouds/closest/${myCoordinates.latitude}/${myCoordinates.longitude}`,
                                    );
                                }}
                            >
                                Closest to me
                            </PrimaryButton>
                        )}
                        <PrimaryButton
                            onClick={() => {
                                setBackendQuery('/clouds');
                            }}
                        >
                            Remove filters
                        </PrimaryButton>
                    </Flex>

                    {cloudsCoordinates && <MapBox data={cloudsCoordinates}></MapBox>}
                </>
            )}
        </CoordinatesContext.Consumer>
    );
}

export default MapView;
