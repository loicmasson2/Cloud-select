import React from 'react';
import { Card, Flex, Heading } from 'rebass';
import axios from 'axios';
import './App.css';

class MapClouds extends React.Component {
    state = {
        coordinates: [],
    };

    componentDidMount() {
        axios.get(`http://127.0.0.1:5000/clouds`).then((res) => {
            const coordinates = res.data.clouds;

            this.setState({ coordinates });
        });
    }

    render() {
        return (
            <ul>
                {this.state.coordinates.map((cloud: any) => (
                    <li>{cloud.cloud_name}</li>
                ))}
            </ul>
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
