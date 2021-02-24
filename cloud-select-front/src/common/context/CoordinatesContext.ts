import React from 'react';

export const CoordinatesContext = React.createContext({
    cloudsCoordinates: [],
    setBackendQuery: (query: string) => {},
});
