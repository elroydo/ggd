import React, { Component } from 'react';
import { getUserToDos } from './UserAPI';
import UserToDoList from './UserToDoActionsList';
import '../UserProfile/to-do-list.css'

class UserToDoActions extends Component {
    async componentDidMount() {
        try {
            const responseUserToDos = await getUserToDos();
            this.setState({userToDoActions: responseUserToDos});
        } catch (error) {
            this.setState({ apiError: "Could not find any To-Dos"});
        }
    }
    state = {
        userToDoActions: [],
        apiError: "",
    };

    render () {
        const { userToDoActions, apiError } = this.state;
        return (
                <div className="todo-container">
                    <l1>{userToDoActions.length >= 1 && 
                    <UserToDoList className ="todo-row" todos={userToDoActions} />}
                    </l1>
                    {userToDoActions.length <= 0 && <h6 style={{textAlign:'center'}}>It looks like you haven't started adding any actions to your to-do list</h6>} 
                    {apiError && <p>Could not fetch any to-dos.</p>}
                </div>
        )
    }
}

export default UserToDoActions;