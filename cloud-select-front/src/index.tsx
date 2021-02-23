import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import { CoordinatesContext } from './CoordinatesContext';
import MapView from './MapView';
import CloudProviderSelection from './CloudProviderSelection';
import Container from './Container';
import reportWebVitals from './reportWebVitals';

const App = () => {
    const [currentCoordinates, setCurrentCoordinates] = useState([]);
    const [query, setQuery] = useState('/clouds');

    const getParamQuery = (paramQuery: string) => {
        setQuery(paramQuery);
    };

    useEffect(() => {
        async function getClouds() {
            const result = await axios(`http://127.0.0.1:5000${query}`);

            setCurrentCoordinates(result.data.clouds);
        }
        getClouds();
    }, [query]);

    return (
        <Router>
            <CoordinatesContext.Provider value={{ coordinates: currentCoordinates, getParamQuery }}>
                <Container>
                    <Switch>
                        <Route exact path="/" component={MapView} />
                        <Route path="/provider/selection" component={CloudProviderSelection} />
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
