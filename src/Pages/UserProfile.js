import React, { Component } from 'react';
import Avatar from "../Images/avatar.png"
import '../Components/UserProfile/user-profile.css'
import UserProfileTabs from '../Components/UserProfile/UserProfileTabs';
import { getUserDetails, getUserBookmarks, getUserActions, getUserToDos } from '../Components/UserProfile/UserAPI';

class userProfile extends Component {
    //declare states
    state = {
        user: [],
        bookmarks: [],
        actions: [],
        todos: [],
        apiError: "",
    };
    //fetch data from api upon loading this component
    async componentDidMount() {
        try {
            const responseUser = await getUserDetails(), 
                responseBookmarks = await getUserBookmarks(),
                responseActions = await getUserActions(),
                responseToDos = await getUserToDos();
            this.setState({ 
                user: responseUser,
                bookmarks: responseBookmarks,
                actions: responseActions,
                todos: responseToDos
            });
            
        } catch (error) {
            this.setState({ apiError: "API error"});
        }
    }

    render() {
        //set state to variables
        const { user, bookmarks, actions, apiError } = this.state;
        return (
            <div className="main">
                {apiError && <div style={{textAlign: 'center', color: 'red'}}>Could not fetch any data.</div>}
                <div className = 'user-acc'>
                    <img src={Avatar} alt="Avatar"/>
                    <h5 className ="name" style = {{color: 'black'}}> {user.username} </h5>
                    <div className ="user-details">
                        
                        <div className = "Details"> 
                            <h5 style = {{color: 'black'}}> {user.forename} {user.surname} </h5>
                        </div>
                        <div className ="Badges" > 
                            <h5 style = {{fontWeight: 'bold', color: 'black'}} >0</h5>
                            <h5 style = {{marginLeft: 5}}> Badges </h5>
                        </div>
                        <div className ="Actions" > 
                            <h5 style = {{fontWeight: 'bold', color: 'black'}} >{actions.length}</h5>
                            <h5 style = {{marginLeft: 5}}> Action{actions.length > 1 ? "s" : ""} </h5>
                        </div>
                        <div className ="Bookmarks" > 
                            <h5 style = {{fontWeight: 'bold', color: 'black'}}>{bookmarks.length}</h5>
                            <h5 style = {{marginLeft: 5}}> Bookmark{bookmarks.length > 1 ? "s" : ""}</h5>
                        </div>
                    </div>
                </div>
                <UserProfileTabs user={user}/>
            </div>
        );
    }
}

export default userProfile;