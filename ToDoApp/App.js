import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Button } from 'react-native';
import {CheckBox} from 'react-native-elements';
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker';

export default class  TodoList extends Component {
  constructor(props) {
      super(props);
      this.state = {list: []};
      this.handleAddTask = this.handleAddTask.bind(this);
      this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }
  handleAddTask(task) {
      console.log("add task clicked");
      this.state.list.push(task);
      this.setState({list: this.state.list})
  }
  handleDeleteTask(task) {
      console.log("Delete task clicked");
      let del = this.state.list.filter(taskItem => taskItem.id !== task);
      this.setState({list: del})
  }
  handleCheckTask(i){
    console.log("checkbox clicked");
    let checklist = this.state.list;
    checklist[i].checked = !checklist[i].checked; 
    this.setState({list: checklist})
  }
  handleList(){
    return this.state.list.map((t,i) => {
      return (
        <View style={styles.container1}>
          <ScrollView>
          <CheckBox
          title= {t.name + ',' + t.due_date}
          checked={t.checked}
          onPress={() => this.handleCheckTask(i)}
        />
        <View style={styles.button}>
        <Button 
            title="Delete" 
            onPress={() => this.handleDeleteTask(t.id)}
        />
        </View>
        </ScrollView>
        </View>
      )
    })
  }
  render() {
      return (
        <SafeAreaView>
        <View style={styles.container}>
          <Text>
            Todo-List App!!!
          </Text>
          <TaskNameForm onAddTask={this.handleAddTask} />
        </View>
        <View style={styles.container1}>
          <ScrollView>
          <View style={styles.container2}>
          <Text>
            List of Tasks!!!
          </Text>
          </View>
          {this.handleList()}
        </ScrollView>
        </View>
        </SafeAreaView>
      );
  }
}

export class TaskNameForm extends Component {
  constructor(props) {
      super(props);
      this.state = {value: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
      const taskList = this.props.taskList;
      // create a task object
      event.preventDefault();
      const task = {id:Date.now(), name: this.state.TextInputvalue, 
      dueDate: new Date(), due_date: this.state.date, checked: false};
      // add the task object to the task list
      this.props.onAddTask(task);
      this.setState({TextInputvalue:''})
      this.setState({date:''})
  }

  handleChange(event) {
      // code to set the state of the component
      this.setState({TextInputvalue: event});
  }

  render() {
      return(
        <View style={styles.container}>
          <TextInput  
                    style={{height: 40, fontSize: 15}}  
                    placeholder= {"Add-Task"}  
                    value = {this.state.TextInputvalue}
                    onChangeText={this.handleChange}  
                    customStyles={{
                      dateInput: {
                        marginLeft: 36
                      }
                    }}
            />  
            <DatePicker 
            style={{width: 200}}
            date={this.state.date} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select-date"
            format="DD-MM-YYYY"
            minDate="01-01-2020"
            maxDate="01-01-2050"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => {this.setState({date: date})}}
            />
          <View style={styles.button}>
          <Button 
            title="Add" 
            onPress={this.handleSubmit}
          />
          </View>
       
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  container1: {
    backgroundColor: 'red',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  container2: {
    alignItems: 'center',
  },
  button: {
    padding: 10,
    fontSize: 15,
    width: 100,
    height: 50,
    textAlign: "center"
  }
});
