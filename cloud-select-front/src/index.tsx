import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import CloudProviderSelection from './CloudProviderSelection';
import Container from './Container';
import reportWebVitals from './reportWebVitals';

const Routing = () => {
    return (
        <Router>
            <Container>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/provider/selection" component={CloudProviderSelection} />
                </Switch>
            </Container>
        </Router>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Routing />
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
