import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    // we'll set initial logged in state to null, until firebase returns us the info about the user
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyDxzibZIIXKMSpr4xglhaasKlwtM-j2_5k",
            authDomain: "authentication-6cf54.firebaseapp.com",
            databaseURL: "https://authentication-6cf54.firebaseio.com",
            storageBucket: "authentication-6cf54.appspot.com",
            messagingSenderId: "458733684862"
        });

        // whenever the user signs in or signs out, the call back function will be called
        firebase.auth().onAuthStateChanged( (user) => {
            // whenever the user logs in or logs out, we'll change the state
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch(this.state.loggedIn) {
            case true:
                return (
                    <Button onPress={ () => firebase.auth().signOut()}>
                        Log Out
                    </Button>
                    );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large"/>;
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication"/>
                {this.renderContent()}
            </View>
        )
    }
}

export default App;