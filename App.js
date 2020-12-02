import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Keyboard, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import firebase from './src/firebaseConnection'
import TaskList from './src/TaskList'
import Icon from 'react-native-vector-icons/Feather'

export default function App() {
  const inputRef = useRef(null)
  const [newTask, setNewTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [key, setKey] = useState('')

  useEffect(() => {
    async function loadTasks() {
      await firebase.database().ref('tarefas').on('value', (snapshot) => {
        setTasks([]);
        snapshot.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome,
          };

          setTasks(oldArray => [...oldArray, data])
        })
      });
    }

    loadTasks();

  }, [])

  async function handleAdd() {
    if (newTask !== '') {

      if (key !== '') {
        await firebase.database().ref('tarefas').child(key).update({
          nome: newTask,
        });
        Keyboard.dismiss();
        setNewTask('')
        setKey('');
        return;
      }

      let tarefas = await firebase.database().ref('tarefas');
      let chave = tarefas.push().key;

      tarefas.child(chave).set({
        nome: newTask
      });
      Keyboard.dismiss();
      setNewTask('')
    }
  }

  async function handleDelete(key) {
    await firebase.database().ref('tarefas').child(key).remove();
  }

  function handleEdit(data) {
    setNewTask(data.nome);
    setKey(data.key);
    inputRef.current.focus();
  }

  function cancelEdit() {
    setKey('');
    setNewTask('');
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>

      { key.length > 0 && (
        <View style={{
          flexDirection: 'row',
          alignSelf: 'center'
        }}>
          <TouchableOpacity style={{ marginRight: 8, marginTop:4 }} onPress={() => cancelEdit()}>
            <Icon name='x-circle' size={20} color='#ffcc00' />
          </TouchableOpacity>
          <View style={{
            backgroundColor: '#ffcc00',
            height: 30,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            width: 220,
          }}>
            <Text style={{
              color: 'white'
            }}>
              Você está editando uma tarefa
            </Text>
          </View>
        </View>
      )}

      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder={'Digite sua tarefa'}
          underlineColorAndroid={'transparent'}
          onChangeText={(texto) => { setNewTask(texto) }}
          value={newTask}
          ref={inputRef}
        />

        <TouchableOpacity style={styles.btnAdd} onPress={handleAdd}>
          <Text style={styles.textAdd}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={({ item }) =>
          <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    marginLeft: 16,
    marginRight: 16
  },
  containerTask: {
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    paddingLeft: 16,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 25,
    height: 45,
    color: '#64686b'
  },
  btnAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
    backgroundColor: '#5ca8e0',
    borderRadius: 25,
    marginLeft: 10,
    elevation: 5
  },
  textAdd: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  }
})