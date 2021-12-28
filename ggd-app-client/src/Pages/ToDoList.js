import React from 'react';
import TodoActions from '../Components/UserProfile/ToDoActions';
import UserActions from '../Components/UserProfile/UserActions';
//import UserToDoActions from '../Components/UserProfile/UserToDoActions';

const toDoList = () => {
    return (
        <div style={{ margin: 'auto' }}>
            <TodoActions />
            <UserActions />
        </div>
    )
}

export default toDoList
