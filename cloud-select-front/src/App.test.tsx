import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import API from 'common/api/api';
import MapView from 'home/MapView';
import CloudProviderSelection from 'selection/CloudProviderSelection';
import CloudRegionSelection from 'selection/CloudRegionSelection';

jest.mock('common/api/api');
test('renders MapView', () => {
    const testMessage = 'Our offering';
    render(<MapView />);
    expect(screen.queryByText(testMessage)).toBeInTheDocument();
});

test('renders CloudProviderSelection', async () => {
    const mockData = { data: ['aws', 'azure', 'google', 'do', 'upcloud'] };
    const testMessage = 'Which cloud service?';

    API.mockResolvedValue(mockData);
    render(<CloudProviderSelection />);

    await waitFor(() => screen.queryByText(testMessage));
    expect(screen.queryByText(testMessage)).toBeInTheDocument();
});

test('renders RegionProviderSelection', async () => {
    const mockData = {
        data: [
            'africa',
            'south asia',
            'east asia',
            'southeast asia',
            'australia',
            'north america',
            'europe',
            'south america',
        ],
    };
    const testMessage = 'Which region?';

    API.mockResolvedValue(mockData);
    render(<CloudRegionSelection />);

    await waitFor(() => screen.queryByText(testMessage));
    expect(screen.queryByText(testMessage)).toBeInTheDocument();
});
