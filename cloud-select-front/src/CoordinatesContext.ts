import React from 'react';

export const CoordinatesContext = React.createContext({
    cloudsCoordinates: [],
    getBackendQuery: (query: string) => {},
});
