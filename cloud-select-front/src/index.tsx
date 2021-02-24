// @ts-nocheck
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import { CoordinatesContext } from './CoordinatesContext';
import MapView from './MapView';
import CloudProviderSelection from './CloudProviderSelection';
import RegionSelection from './RegionSelection';
import Container from './Container';
import reportWebVitals from './reportWebVitals';

const App = () => {
    const [cloudsCoordinates, setCloudsCoordinates] = useState([]);

    const [query, setQuery] = useState('/clouds');

    const getBackendQuery = (paramQuery: string) => {
        setQuery(paramQuery);
    };

    useEffect(() => {
        async function getClouds() {
            const result = await axios(`http://127.0.0.1:5000${query}`);
            console.log('hello');
            setCloudsCoordinates(result.data.clouds);
        }
        getClouds();
    }, [query]);

    console.log(cloudsCoordinates);

    return (
        <Router>
            <CoordinatesContext.Provider value={{ cloudsCoordinates, getBackendQuery }}>
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
