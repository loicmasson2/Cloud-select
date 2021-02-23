import React from 'react';

export const CoordinatesContext = React.createContext({
    coordinates: [],
    getParamQuery: (query: string) => {},
});
