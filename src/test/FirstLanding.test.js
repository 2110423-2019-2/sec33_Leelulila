import React from 'react';
import ReactDOM from 'react-dom';
import FirstLanding from '../components/FirstLanding';
import { render } from '@testing-library/react';

it('Render without crashing', () => {
    const div = document.getElementById('div');
    ReactDOM.render(<FirstLanding />, div);
})
