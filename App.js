import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TodoListScreen from './src/TodoListScreen';
import AddTodoItemScreen from './src/AddTodoItemScreen';
import LoginPage from './src/LoginPage';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const NavStack = createStackNavigator({
  LoginPage: {
    screen: LoginPage,
  },
  Home: {
      screen: TodoListScreen,
      AddTodoItemScreen,
  },
  AddTodoItemScreen: {
    screen: AddTodoItemScreen,
  },
});

const App = createAppContainer(NavStack);


export default App;