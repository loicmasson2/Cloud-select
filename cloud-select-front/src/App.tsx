import React from 'react';
import { Card, Flex, Heading } from 'rebass';
import axios from 'axios';
import mapboxgl, { Map } from 'mapbox-gl';
import './App.css';
mapboxgl.accessToken = 'pk.eyJ1IjoibG9pY21hc3NvbiIsImEiOiJjanI4MXN4MWswMXZhNDNtbHN5dzZzanlsIn0.4fw0ARbOrTr88AHvIEaVyw';
class MapClouds extends React.Component {
    private mapContainer: HTMLElement | null | undefined = undefined;
    private map: Map | undefined;
    state = {
        coordinates: [],
        lat: 60.158,
        long: 24.903,
        zoom: 2,
    };

    componentDidMount() {
        // axios.get(`http://127.0.0.1:5000/clouds`).then((res) => {
        //     const coordinates = res.data.clouds;

        //     this.setState({ coordinates });
        // });

        const map = new mapboxgl.Map({
            container:
                this.mapContainer === undefined || this.mapContainer === null
                    ? '' // or pass in some other HTMLElement which is definitely defined or similar ...
                    : this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.long, this.state.lat],
            zoom: this.state.zoom,
        });
    }

    render() {
        return (
            <div>
                <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
            </div>
        );
    }
}

function App() {
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
                        <MapClouds></MapClouds>
                    </Card>
                </Flex>
            </Flex>
        </div>
    );
}

export default App;
