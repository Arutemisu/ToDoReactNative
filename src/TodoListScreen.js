/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Alert, SafeAreaView, StyleSheet, AsyncStorage} from 'react-native';
import TodoList from './TodoListComponent';
import { Button, Text } from 'native-base';
import {db} from './Firebase';
import {readItem} from './ItemService';


const initialTodoItems  = [
  { key: '0', title: "Create first todo", isCompleted: true },
  { key: '1', title: "Climb a mountain", isCompleted: false },
  { key: '2', title: "Create React Native blog post", isCompleted: false },
 ];



export default class TodoListScreen extends React.Component {
  static navigationOptions = {
    title: 'Todo List',
};
  constructor(props) {
    super(props);
    this.state = {todoItems: []};

    // This binding is necessary to make `this` work in the callback
    this.toggleItemCompleted = this.toggleItemCompleted.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.initializeTodoList = this.initializeTodoList.bind(this);

    
    this.initializeTodoList();
  }
  componentDidMount() {
    this._sub = this.props.navigation.addListener(
      'didFocus',
      this.initializeTodoList
    );
  }
  componentWillUnmount() {
    this._sub.remove();
  }

  
  async initializeTodoList() {
    let todoItems = initialTodoItems.slice(); // Start with a copy of our initial list
    /*
    const list = [];
    db.get().then(toDolist => {
            toDolist.forEach((doc) => {
                const { key, title, isCompleted } = doc._document.data.toString(); 
                list.push({key: key, title: title, isCompleted: isCompleted});
                }
        )
    })
    todoItems = list; */
    // If there's already a saved list, use that instead
    const storedTodoItems = await AsyncStorage.getItem("todoList");
    if(storedTodoItems != null) {
      const storedTodoArray = JSON.parse(storedTodoItems);
      if(storedTodoArray.length) todoItems = storedTodoArray;
    }
    this.setState({todoItems: todoItems}
      , () => AsyncStorage.setItem("todoList", JSON.stringify(this.state.todoItems))); 
  }

  toggleItemCompleted(itemKey) {
    this.setState((prevState, props) => {
      // Use a temporary variable to avoid directly modifying state
      const tempTodoItems = prevState.todoItems;
      const toggledItemIndex = tempTodoItems.findIndex(item => item.key === itemKey);
      tempTodoItems[toggledItemIndex].isCompleted = 
        !tempTodoItems[toggledItemIndex].isCompleted;
      return {todoItems: tempTodoItems};
    }, () => AsyncStorage.setItem("todoList", JSON.stringify(this.state.todoItems)));
  }

  deleteItem(itemKey) {
    this.setState((prevState, props) => {
      // Use a temporary variable to avoid directly modifying state
      let tempTodoItems = prevState.todoItems;
      const deletedItemIndex = tempTodoItems.findIndex(item => item.key === itemKey);
      tempTodoItems.splice(deletedItemIndex, 1);
      return {todoItems: tempTodoItems};
    }, () => AsyncStorage.setItem("todoList", JSON.stringify(this.state.todoItems)));
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <TodoList todoItems={this.state.todoItems} onToggleItemCompleted={this.toggleItemCompleted}
          onDeleteItem={this.deleteItem} style={styles.todoList} />
          <Button style={styles.addButton} primary rounded onPress={() => navigate('AddTodoItemScreen')}>
            <Text>+</Text>
          </Button>     
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
  todoList: {
    flexGrow: 1,
  },
  addButton: {
    borderWidth:1,
    position:'absolute',
    bottom:0,
    alignSelf:'flex-end'
  }
});