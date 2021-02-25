import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Flex, Heading, Text } from 'rebass';
import LinkButton from 'common/components/LinkButton';
import H1 from 'common/components/H1';
import FilterCard from 'common/components/FilterCard';
import { CoordinatesContext } from './common/context/CoordinatesContext';

function CloudProviderSelection() {
    const history = useHistory();
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        async function getClouds() {
            const result = await axios(`http://127.0.0.1:5000/providers`);
            setProviders(result.data);
        }
        getClouds();
    }, [history]);

    function handleClick() {
        history.push('/');
    }

    return (
        <CoordinatesContext.Consumer>
            {({ setBackendQuery }) => (
                <>
                    <Flex flexDirection="column" alignItems="center" justifyContent="space-evenly" height={'100%'}>
                        {providers.length !== 0 && (
                            <>
                                <H1>Which cloud service?</H1>
                                <Flex
                                    flexWrap={'wrap'}
                                    alignItems="center"
                                    alignContent="space-between"
                                    justifyContent="center"
                                >
                                    {providers.map((provider: string) => (
                                        <FilterCard key={provider}>
                                            <Flex
                                                justifyContent="center"
                                                alignItems="center"
                                                height={'100%'}
                                                onClick={() => {
                                                    setBackendQuery(`/providers/${provider}`);
                                                    handleClick();
                                                }}
                                            >
                                                <Text>{provider.toUpperCase()}</Text>
                                            </Flex>
                                        </FilterCard>
                                    ))}
                                </Flex>
                                <LinkButton to="/">Home</LinkButton>
                            </>
                        )}
                    </Flex>
                </>
            )}
        </CoordinatesContext.Consumer>
    );
}

export default CloudProviderSelection;
