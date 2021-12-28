import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {RiCloseCircleLine} from 'react-icons/ri'
import '../UserProfile/to-do-list.css'
import {deleteUserToDoByID} from '../UserProfile/UserAPI';

const UserToDoItem = (props) => {
    const { todo } = props;

    const deleteItem = () => {
        if (deleteUserToDoByID(todo)) {
            window.location.reload(true);
            console.log("deleted");
        } else {
            console.log("no");
        }
    }

    return (
        <div className = "todo-container"> 
            <div className="todo-row" >
                <div style ={{width: '700px'}}> 
                <l1>{todo.description}</l1>
                <button className="btn btn-light action-favorite-button" type="button" todo={todo} onClick={() => deleteItem()}>
                <RiCloseCircleLine 
                    todo={todo}
                    className='delete-icon'
                    alt={todo.description}  
                    style={{ cursor: 'pointer' }}
                    />
                </button>
            </div>
            </div>
            </div>
    );
};

const UserTodoList = (props) => {
    return (
    <ul>
        {props.todos.map((todo, index) => ( //iterate through each action
        <div className= "todo-container"> 
            <l1>
                <UserToDoItem todo={todo}  key={todo.description + index} /> 
            </l1>
            </div>
        ))}

    </ul>
    );
};

export default UserTodoList;
