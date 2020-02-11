import React from 'react';
import RegisterForm from '../components/RegisterForm';
import '../style.css';
import { Container } from '@material-ui/core';

const Register = () => {
    return (
        <div>
            <Container>
                <h1>Register for ACTTIME</h1>
                <RegisterForm/>
            </Container>
        </div>
    );
};

export default Register;