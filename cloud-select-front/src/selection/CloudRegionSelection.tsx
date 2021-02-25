import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Text } from 'rebass';

import API from 'common/api/api';
import LinkButton from 'common/components/LinkButton';
import H1 from 'common/components/H1';
import FilterCard from 'common/components/FilterCard';

import { CoordinatesContext } from '../common/context/CoordinatesContext';

const CloudRegionSelection = () => {
    const history = useHistory();

    const [regions, setRegions] = useState([]);

    useEffect(() => {
        async function getClouds() {
            const result = await API(`/regions`);
            setRegions(result.data);
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
                        {regions.length !== 0 && (
                            <>
                                <H1>Which region?</H1>
                                <Flex
                                    flexWrap={'wrap'}
                                    alignItems="center"
                                    alignContent="space-between"
                                    justifyContent="center"
                                >
                                    {regions.map((provider: string) => (
                                        <FilterCard key={provider}>
                                            <Flex
                                                justifyContent="center"
                                                alignItems="center"
                                                height={'100%'}
                                                onClick={() => {
                                                    setBackendQuery(`/regions/${provider}`);
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
};

export default CloudRegionSelection;
