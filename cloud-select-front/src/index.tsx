// @ts-nocheck
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import API from 'common/api/api';
import CloudProviderSelection from 'selection/CloudProviderSelection';
import RegionSelection from 'selection/CloudRegionSelection';
import Container from 'common/components/Container';
import { CoordinatesContext } from 'common/context/CoordinatesContext';
import MapView from 'home/MapView';
import reportWebVitals from 'reportWebVitals';

import './index.css';

const App = () => {
    const [cloudsCoordinates, setCloudsCoordinates] = useState([]);

    const [query, setQuery] = useState('/clouds');

    const setBackendQuery = (paramQuery: string) => {
        setQuery(paramQuery);
    };

    useEffect(() => {
        async function getClouds() {
            const result = await API(`${query}`);
            setCloudsCoordinates(result.data.clouds);
        }
        getClouds();
    }, [query]);

    return (
        <Router>
            <CoordinatesContext.Provider value={{ cloudsCoordinates, setBackendQuery }}>
                <Container>
                    <Switch>
                        <Route exact path="/" component={MapView} />
                        <Route path="/filter/provider" component={CloudProviderSelection} />
                        <Route path="/filter/region" component={RegionSelection} />
                    </Switch>
                </Container>
            </CoordinatesContext.Provider>
        </Router>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);

reportWebVitals();
