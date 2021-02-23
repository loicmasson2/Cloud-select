import React, { useState, useEffect } from 'react';
import { Card, Flex, Heading, Text } from 'rebass';
import axios from 'axios';
import './CloudProviderSelection.css';

function CloudProviderSelection() {
    const [data, setData] = useState([]);

    const listProviders = ['AWS', 'GCP', 'AZURE', 'DO', 'UPCLOUD'];
    console.log(listProviders);
    useEffect(() => {
        async function getClouds() {
            const result = await axios('http://127.0.0.1:5000/clouds');

            setData(result.data.clouds);
        }
        getClouds();
    }, []);

    return (
        <Flex flexDirection="column" alignItems="center" justifyContent="space-evenly" height={'100%'}>
            <Heading fontFamily={'Ubuntu'} as={'h1'} fontSize={7} mt={4}>
                Which cloud service?
            </Heading>
            <Flex flexWrap={'wrap'} alignItems="center" alignContent="space-between" justifyContent="center">
                {listProviders.map((provider) => (
                    <div className="card">
                        <Card
                            sx={{
                                boxShadow: 'rgba(0, 0, 0, 0.125) 0px 0px 4px',
                            }}
                            width={256}
                            height={200}
                            m={4}
                        >
                            <Flex justifyContent="center" alignItems="center" height={'100%'}>
                                <Text>{provider}</Text>
                            </Flex>
                        </Card>
                    </div>
                ))}
            </Flex>
        </Flex>
    );
}

export default CloudProviderSelection;
