import React from 'react';
import { StyleSheet, View, TextInput, AsyncStorage } from 'react-native';
import { Button, Text } from 'native-base';
import {addItem} from './ItemService';
export default class TodoListScreen extends React.Component {
  static navigationOptions = {
      title: 'Add Todo Item',
  };
  constructor(props) {
    super(props);

    this.state = { newTodoTitle: "" };
    this.saveTodoItem = this.saveTodoItem.bind(this);
    }

    async saveTodoItem() {
    let todoItems = [];
    let nextTodoKey = 0;
    const storedTodoItems = await AsyncStorage.getItem("todoList");
    if(storedTodoItems != null) {
        const storedTodoArray = JSON.parse(storedTodoItems);
        if(storedTodoArray.length) {
            todoItems = storedTodoArray;
            nextTodoKey = Math.max(...(todoItems.map(t =>parseInt(t.key)))) + 1;
        }
    }

    todoItems.push({ key: nextTodoKey.toString(), title: this.state.newTodoTitle });
    var item = { key: nextTodoKey.toString(), title: this.state.newTodoTitle, isCompleted: false };
    addItem(item);
    await AsyncStorage.setItem("todoList", JSON.stringify(todoItems));
    this.props.navigation.goBack();
    }
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={{borderWidth:1}}placeholder="Add stuff to do"  value={this.state.newTodoTitle} 
            onChangeText={(text) => this.setState({newTodoTitle: text})} />
        <View style={styles.buttonsRow}>
            <Button primary full rounded onPress={() => this.props.navigation.goBack()}>
            <Text style={{color: 'white'}}>Cancel</Text>
            </Button>
            <Button primary full rounded onPress={() => this.saveTodoItem()}>
            <Text style={{color: 'white'}}>Save</Text>
            </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonsRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
  },
});