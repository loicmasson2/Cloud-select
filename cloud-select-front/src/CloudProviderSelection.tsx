import React, { useState, useEffect } from 'react';
import { Card, Flex, Heading } from 'rebass';
import axios from 'axios';

function CloudProviderSelection() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getClouds() {
            const result = await axios('http://127.0.0.1:5000/clouds');

            setData(result.data.clouds);
        }
        getClouds();
    }, []);

    return (
        <>
            <Heading fontFamily={'Ubuntu'} as={'h1'} fontSize={7} mt={4}>
                Which cloud service?
            </Heading>
        </>
    );
}

export default CloudProviderSelection;
