import React, {Component} from 'react'
import '../UserProfile/to-do-list.css'
import { createUserToDos } from '../UserProfile/UserAPI';
import UserToDoActions from './UserToDoActions';
import {deleteUserToDoByID} from  '../UserProfile/UserAPI';
import { getUserToDos } from './UserAPI';
class ToDoActions extends Component {
    constructor(props){
        super(props);
        this.state={
            description: "",
            list: [],
        } 
    }

    updateInput(key, value){
        this.setState({
            [key]: value 
        })
    }

    addItem(){
        const todo = {
            description: this.state.description.slice(),
        };

        const list = [...this.state.list];
        list.push(todo);

        this.setState({
            list,
            description: ""
        });
        console.log(todo);
        createUserToDos(todo);
    }

    deleteItem(todo){
        const responseUserToDos = getUserToDos(todo.toDoId);
        this.setState({userToDoActions: responseUserToDos});
        if (deleteUserToDoByID(todo.toDoId)) {
            console.log("deleted");
        } else {
            console.log("no");
        }
        }

    render(){
    return (
        <div className = "todo-app">
            <h4 style={{paddingTop: 30, paddingBottom: 10, fontWeight: 'bold', textAlign: 'center'}}> What would you like to do for the World? </h4>
            <input 
            type = 'text'
            placeholder='Type in your action'
            name='text'
            className='todo-input'
            onChange={(e) => this.updateInput("description", e.target.value)}
            value={this.state.description}
            />

            <button 
            className='todo-button' 
            onClick={()=> this.addItem(this.state.description)}>Add Action</button>
            
            <UserToDoActions />

            <ul>
            {this.state.list.map((todo, index) => {
                return (
                <div className= "todo-container"> 
                    <div className = "todo-row"> 
                    <l1 key={todo.description + index}>
                    {todo.description}
                    </l1>
                    </div>
                {/* <button className="btn btn-light action-favorite-button" type="button" todo={todo} onClick={() => this.deleteItem(todo)}>
                <RiCloseCircleLine 
                    todo={todo}
                    className='delete-icon'
                    alt={todo.description}  
                    style={{ cursor: 'pointer' }}
                    />
                </button> */}
                </div>
            )}
            )}
            </ul> 
            
        </div>
    )
    }
}


export default ToDoActions;