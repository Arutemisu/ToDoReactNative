import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage, Alert} from 'react-native';
import { Container, Content, Header, Form, Input, Item,
Button, Label} from 'native-base';
import DialogInput from 'react-native-dialog-input';
import firebase from './Firebase';

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props)
        this.state=({
         email: '',
         password: '',
         isDialogVisible: false
       })
    }



    _signUpUser = (email, password) => {
        try {
         if(this.state.password.length<6)
         {
          alert("Please enter at least 6 characters")
          return;
         }
         firebase.auth().createUserWithEmailAndPassword(email, password)
          alert("Congratulations, your account has been setup")
        }
        catch(error){
         console.log(error.toString())
        }
       }
    
    _loginUser = (email, password) => {
        try {
         firebase.auth().signInWithEmailAndPassword(email,
       password).then((user) =>{
         this.props.navigation.navigate('Home');
        })
       }
        catch(error) {
         console.log(error.toString())
        }
       }

    _signOutUser = () => {
        firebase.auth().signOut().then(function (user){
        }).catch(function(error) {
         console.log(error)
        });
       }

    _forgotPassword = () => {
        this.setState({
         isDialogVisible: this.state.isDialogVisible = true
        })
       }

    _sendReset = (useremail) => {
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(useremail).then(function()
       {
         alert("Password reset email has been sent")
        }).catch(function(error) {
         console.log(error)
        });
       }
       render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.container}>
            <Text style={styles.mainheader}>Login Page</Text>
            <Form>
             <Item>
              <Label>Email</Label>
              <Input
               autocorrect={false} onChangeText={(email) => this.setState({ email })}/>
                </Item>
              <Item>
               <Label>Password</Label>
               <Input
                secureTextEntry={true} onChangeText={(password) => this.setState({ password })}/>
              </Item>
              <Button style={{marginTop:10}} primary full rounded onPress={() => this._loginUser(this.state.email, this.state.password)}>
                <Text style={{color: 'white'}}>Login</Text>
              </Button>
              <Button style={{marginTop:10}} success full rounded onPress={() => this._signUpUser(this.state.email, this.state.password)}>
                <Text style={{color: 'white'}}>Sign Up</Text>
              </Button>
              <Button style={{marginTop:10}} warning full rounded onPress={() => this._forgotPassword()}>
                <Text style={{color: 'white'}}>Forgot Password </Text>
              </Button>
             </Form>
             <DialogInput isDialogVisible={this.state.
                isDialogVisible}
                      title={"Forgot Password"}
                      message={"Please input your email address"}
                      hintInput ={"john@test.com"}
                      submitInput={ (useremail) => {this.
                sendReset(useremail)} }
                      closeDialog={ () => { this.setState({
                      isDialogVisible: this.state.isDialogVisible = false
                      })}}>
                     </DialogInput>
            </Container>
        );
      }
}


const styles = StyleSheet.create({
    mainheader: {
        fontWeight: 'bold',
        backgroundColor: '#eee',
        paddingTop: 5,
        paddingBottom: 5,    
      },
      container: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
      },
  });