import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });
        // attempt to log user in with the email and password that user provided
        firebase.auth().signInWithEmailAndPassword(email, password)
            // if succesfully logged in
            .then(this.onLoginSuccess.bind(this))
            // handle first error
            .catch( () => {
                // if signing in failed, let's attempt to create user an account
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    // if new account has been created and user is now logged in
                    .then(this.onLoginSuccess.bind(this))
                    // if failed to create an account, display error message
                    .catch(this.onLoginFail.bind(this));
            });
    }

    onLoginSuccess() {
        this.setState({ 
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed!', loading: false})
    }

    renderSpinnerOrButton() {
        if (this.state.loading) {
            return <Spinner size="small" />
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        )
    }

    render() {
        return (
            <Card>

                <CardSection>
                    <Input
                        placeholder="user@email.com"
                        label="Email"
                        value = {this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry // shorthand for secureTextEntry={true}
                        placeholder="password"
                        label="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderSpinnerOrButton()}
                </CardSection>

            </Card>
        )
    }
}

styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm