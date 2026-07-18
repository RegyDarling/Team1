import React from 'react'
import Items from './items'

const List = (props) => {
  return (
    // Container div for rendering the list of users
    <div>
        {/*Map through usersList arraty to render an Item component for each user */}
        {props. usersList.map((user)=>(
            <Items 
            key={user.id}
            details={user}
            />
         ))}
    </div>
  )
}
export default List
