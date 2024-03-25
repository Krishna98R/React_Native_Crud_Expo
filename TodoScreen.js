import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconButton } from 'react-native-paper'
import {openDatabase} from 'react-native-sqlite-storage';
import axios from 'axios';
const dummyData = [
  {
    id: "1",
    task: "Read a book"
  },
  {
    id: "2",
    task: "walk"
  },
  {
    id: "3",
    task: "gym"
  },
]
// var db = openDatabase({ name: 'db1.db' });
// useEffect(() => {
//   db.transaction(function (txn) {
//     txn.executeSql(
//       "SELECT name FROM sqlite_master WHERE type='table' AND name='random_table_name'",
//       [],
//       function (tx, res) {
//         console.log('item:', res.rows.length);
//         if (res.rows.length == 0) {
//           txn.executeSql('DROP TABLE IF EXISTS random_table_name', []);
//           txn.executeSql(
//             'CREATE TABLE IF NOT EXISTS random_table_name(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
//             []
//           );
//         }
//       }
//     );
//   });
// }, []);
const TodoScreen = () => {

  useEffect(() => {
    getData();
  },[])
  const getData = async()=>{
    const res = await axios.get('https://fakestoreapi.com/products/1');
    console.log("MY Res-->",res.data); 
  }

  // Init local state
  const [toDoInputFieldValue, setToDoInputFieldValue] = useState("");
  const [toDoArray, setTodoArray] = useState([]);
  const [editedTodoObj, setEditedTodoObj] = useState(null); // just saving the edited value

  const handleAddTodo = () => {
    setTodoArray([...toDoArray, { id: Date.now().toString(), task: toDoInputFieldValue }])
    setToDoInputFieldValue("");

  }

  const handleDeleteTodo = (id) => {
    const updatedTodoArray = toDoArray.filter((todo) => todo.id !== id)
    setTodoArray(updatedTodoArray)
  }

  const handleEditInputFieldTodo = (todoObjToBeEdited) => {
    setEditedTodoObj(todoObjToBeEdited) // saving in state
    setToDoInputFieldValue(todoObjToBeEdited.task)

  }

  const handleUpdateTodo = () => {
   
    const updatedTodos = toDoArray.map((item) => {
      if( item.id === editedTodoObj.id){
        return{...item , task: toDoInputFieldValue}
      }
      return item
    });
    setTodoArray(updatedTodos)
    setToDoInputFieldValue("")
    setEditedTodoObj(null)

  }


  //render todo
  const renderTodoFunction = ({ item, index }) => {
    return (
      <View style={{
        backgroundColor: "#1e90ff", borderRadius: 6,
        paddingHorizontal: 6, paddingVertical: 12, marginBottom: 12, flexDirection: "row"
      }}>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800", flex: 1, textAlignVertical: "center" }}>{item.task}</Text>
        <IconButton icon="pencil" iconColor='#fff' onPress={() => handleEditInputFieldTodo(item)} />
        <IconButton icon="trash-can" iconColor='#fff' onPress={() => handleDeleteTodo(item.id)} />

      </View>
    )
  }

  return (
    <View style={{ marginHorizontal: 16, paddingTop: 100 }}>
      <Text>Name</Text>
      {/* oncahngetext will set the state */}
      <TextInput style={{
        borderWidth: 2, borderColor: "#1e90ff", borderRadius: 6, paddingVertical: 6,
        paddingHorizontal: 16
      }}
        placeholder='Add a task'
        value={toDoInputFieldValue}
        onChangeText={(userText) => setToDoInputFieldValue(userText)}

      ></TextInput>



      {
        editedTodoObj ? <TouchableOpacity style={{
          backgroundColor: "#000", borderRadius: 6,
          paddingVertical: 8, marginVertical: 34, alignItems: "center"
        }}
          onPress={() => handleUpdateTodo()}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>SAVE</Text>
        </TouchableOpacity> :

          <TouchableOpacity style={{
            backgroundColor: "#000", borderRadius: 6,
            paddingVertical: 8, marginVertical: 34, alignItems: "center"
          }}
            onPress={() => handleAddTodo()}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>ADD</Text>
          </TouchableOpacity>

      }


      {/* to list */}

      {/* <FlatList data = {dummyData} renderItem={renderTodoFunction} ></FlatList> */}
      <FlatList data={toDoArray} renderItem={renderTodoFunction} ></FlatList>

    </View>
  )
}

export default TodoScreen

const styles = StyleSheet.create({})