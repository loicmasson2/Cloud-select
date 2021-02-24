import React, { FunctionComponent } from 'react';
import { Flex } from 'rebass';
import ReactMapGL, { Marker } from 'react-map-gl';
import Pin from 'common/components/Pin/Pin';
import Tooltip from 'common/components/Tooltip';

type MapBoxProps = {
    data: BackEndCoordinates[];
};

type BackEndCoordinates = {
    cloud_name: string;
    geo_latitude: number;
    geo_longitude: number;
};
const MapBox: FunctionComponent<MapBoxProps> = (props) => {
    const [viewport, setViewport] = React.useState({
        longitude: 24.90368,
        latitude: 60.158771,
        zoom: 1,
    });
    const markers = React.useMemo(
        () =>
            props.data.map((cloud: BackEndCoordinates) => (
                <Marker
                    key={cloud.cloud_name}
                    longitude={cloud.geo_longitude}
                    latitude={cloud.geo_latitude}
                    offsetTop={-32} // to have the arrow down just under the pin
                    offsetLeft={-16}
                >
                    <Tooltip>{cloud.cloud_name}</Tooltip>
                    <Pin></Pin>
                </Marker>
            )),
        [props.data],
    );

    return (
        <Flex alignItems="center" justifyContent="center" height="80%">
            <ReactMapGL
                {...viewport}
                width="90%"
                height="90%"
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
};

export default MapBox;
