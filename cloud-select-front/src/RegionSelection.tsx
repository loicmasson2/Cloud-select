import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Button, Card, Flex, Heading, Text } from 'rebass';
import { CoordinatesContext } from './CoordinatesContext';

import './CloudProviderSelection.css';

function RegionSelection() {
    const history = useHistory();

    const [regions, setRegions] = useState([]);

    useEffect(() => {
        async function getClouds() {
            const result = await axios(`http://127.0.0.1:5000/regions`);
            setRegions(result.data);
        }
        getClouds();
    }, []);

    function handleClick() {
        history.push('/');
    }
    return (
        <CoordinatesContext.Consumer>
            {({ getBackendQuery }) => (
                <>
                    <Flex flexDirection="column" alignItems="center" justifyContent="space-evenly" height={'100%'}>
                        {regions.length !== 0 && (
                            <>
                                <Heading fontFamily={'Ubuntu'} as={'h1'} fontSize={7} mt={4}>
                                    Which region?
                                </Heading>
                                <Flex
                                    flexWrap={'wrap'}
                                    alignItems="center"
                                    alignContent="space-between"
                                    justifyContent="center"
                                >
                                    {regions.map((provider: string) => (
                                        <div key={provider} className="card">
                                            <Card
                                                sx={{
                                                    boxShadow: 'rgba(0, 0, 0, 0.125) 0px 0px 4px',
                                                }}
                                                width={256}
                                                height={200}
                                                m={4}
                                            >
                                                <Flex
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    height={'100%'}
                                                    onClick={() => {
                                                        getBackendQuery(`/regions/${provider}`);
                                                        handleClick();
                                                    }}
                                                >
                                                    <Text>{provider.toUpperCase()}</Text>
                                                </Flex>
                                            </Card>
                                        </div>
                                    ))}
                                </Flex>
                                <Link to="/">
                                    <Button backgroundColor="#093EFF" fontWeight="400" color="#53FF35">
                                        Home
                                    </Button>
                                </Link>
                            </>
                        )}
                    </Flex>
                </>
            )}
        </CoordinatesContext.Consumer>
    );
}

export default RegionSelection;
