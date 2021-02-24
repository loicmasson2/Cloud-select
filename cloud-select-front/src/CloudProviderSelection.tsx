import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Flex, Heading, Text } from 'rebass';
import { CoordinatesContext } from './CoordinatesContext';

import './CloudProviderSelection.css';

function CloudProviderSelection() {
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        async function getClouds() {
            const result = await axios(`http://127.0.0.1:5000/providers`);
            setProviders(result.data);
        }
        getClouds();
    }, []);

    return (
        <CoordinatesContext.Consumer>
            {({ getParamQuery }) => (
                <>
                    <Flex flexDirection="column" alignItems="center" justifyContent="space-evenly" height={'100%'}>
                        {providers.length !== 0 && (
                            <>
                                <Heading fontFamily={'Ubuntu'} as={'h1'} fontSize={7} mt={4}>
                                    Which cloud service?
                                </Heading>
                                <Flex
                                    flexWrap={'wrap'}
                                    alignItems="center"
                                    alignContent="space-between"
                                    justifyContent="center"
                                >
                                    {providers.map((provider: string) => (
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
                                                        getParamQuery(`/providers/${provider}`);
                                                    }}
                                                >
                                                    <Text>{provider.toUpperCase()}</Text>
                                                </Flex>
                                            </Card>
                                        </div>
                                    ))}
                                </Flex>
                                <Link to="/">Home</Link>
                            </>
                        )}
                    </Flex>
                </>
            )}
        </CoordinatesContext.Consumer>
    );
}

export default CloudProviderSelection;
