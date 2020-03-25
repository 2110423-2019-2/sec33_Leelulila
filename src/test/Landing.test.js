import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../pages/Navbar';
import ProfileBar from '../components/ProfileBar'
import FirstLanding from '../components/FirstLanding';

it('Render logo without crashing', () => {
    const div = document.createElement('NavBarLogo');
    ReactDOM.render(<NavBar />, div)
})

it('Render login button without crashing', () => {
    const div = document.createElement('loginBtn');
    ReactDOM.render(<ProfileBar />, div)
})

it('Render register button without crashing', () => {
    const div = document.createElement('registerBtn');
    ReactDOM.render(<ProfileBar />, div)
})

it('Render welcome text without crashing', () => {
    const div = document.createElement('WelcomeText');
    ReactDOM.render(<FirstLanding />, div)
})

it('Render pic without crashing', () => {
    const div = document.createElement('picFirstLanding');
    ReactDOM.render(<FirstLanding />, div)
})

it('Render footer without crashing', () => {
    const div = document.createElement('Footer');
    ReactDOM.render(<NavBar />, div)
})