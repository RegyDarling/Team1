import React from 'react'
import Form from './components/Form'
import { useState } from 'react'
import List from './components/List'
import { v4 as uuidv4 } from 'uuid';


const App = () => {
  const [ users,setUsers ]= useState([
    {name: "Lois", email: "Lois@gmail.com" , id: uuidv4() },
    {name: "John", email: "John@gmail.com" , id: uuidv4() },
    {name: "Peter", email: "Peter@gmail.com" ,  id: uuidv4() },
  ])

  console.log(users)

  //Function to add a new user to the users list
const addNewUser = (newUser)=>{
  setUsers([...users, newUser]) // Append new user to existing list
}


  return (

    //Grid layout to display Form and List side by side
      <div className="grid grid-cols-2">
        {/* Form compnent for adding new users */}
      <Form addUser={addNewUser} />
      {/* List component to display users, passing users array and edit/delete */}
      <List usersList={users} />
    </div>
  )
}

export default App
