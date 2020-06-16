import React, { Component } from 'react';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import './App.css';

const poolData = {
    UserPoolId: 'us-east-2_G4hXI5Qhq',
    ClientId: '5t2vbhpe14b4fcepjgsnn15cia'
}

const userPool = new CognitoUserPool(poolData)

class App extends Component {

    signUpButtonClicked = () => {
        userPool.signUp("moshe@test.com", "pa55", [], null, (err, data) => {
            if (err)
                console.log(err)
            else
                console.log(data)
        })
    }
    singInButtonClicked = () => {

        var authenticationDetails = new AuthenticationDetails(
            {
                Username: 'moshe@test.com',
                Password: 'pa55',
            }
        );

        var cognitoUser = new CognitoUser({
            Username: 'moshe@test.com',
            Pool: userPool,
        });

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log('User authenticated')
            },

            onFailure: function (err) {
                alert(err.message || JSON.stringify(err));
            },
        });
    }

    render() {
        return (
            <div className="App" >
                <header className="App-header" >
                    <p> hello </p>
                    <button onClick={this.signUpButtonClicked}>Click to sign up</button>
                    <button onClick={this.singInButtonClicked}>Click to sign in</button>
                </header>
            </div>)
    }
}

export default App;
