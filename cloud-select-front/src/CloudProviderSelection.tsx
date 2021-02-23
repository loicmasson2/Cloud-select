import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Flex, Heading, Text } from 'rebass';
import { CoordinatesContext } from './CoordinatesContext';

import './CloudProviderSelection.css';

function CloudProviderSelection() {
    const listProviders = ['AWS', 'GOOGLE', 'AZURE', 'DO', 'UPCLOUD'];
    return (
        <CoordinatesContext.Consumer>
            {({ getParamQuery }) => (
                <>
                    <Flex flexDirection="column" alignItems="center" justifyContent="space-evenly" height={'100%'}>
                        <Link to="/">Filter</Link>

                        <Heading fontFamily={'Ubuntu'} as={'h1'} fontSize={7} mt={4}>
                            Which cloud service?
                        </Heading>
                        <Flex
                            flexWrap={'wrap'}
                            alignItems="center"
                            alignContent="space-between"
                            justifyContent="center"
                        >
                            {listProviders.map((provider) => (
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
                                            <Text>{provider}</Text>
                                        </Flex>
                                    </Card>
                                </div>
                            ))}
                        </Flex>
                    </Flex>
                </>
            )}
        </CoordinatesContext.Consumer>
    );
}

export default CloudProviderSelection;
