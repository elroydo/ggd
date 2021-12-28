import React, { Component } from 'react';
import { getUserBookmarks } from '../Components/UserProfile/UserAPI';
import BookmarkList from '../Components/UserProfile/BookmarkList';

class Bookmarks extends Component {
    //run function on component load (lifecycle)
    async componentDidMount() {
        try {
            const responseBookmarks = await getUserBookmarks(); //get user bookmarks initialised to a variable
            this.setState({userBookmarks: responseBookmarks}); //set response to state
        } catch (error) {
            this.setState({ apiError: "Could not find any bookmarks"});
        }
    }
    state = {
        userBookmarks: [],
        apiError: "",
    };

    render () {
        const { userBookmarks, apiError } = this.state; //initialise variables as component state
        return (
            <div className="main" >
                <h4 className="page-heading" style={{fontWeight: 'bold', paddingTop: 30, paddingBottom:10, overflowY:'hidden'}}> Your Bookmarks: </h4>
                <div className="bookmarks" style={{textAlign: 'center', padding: 10}}>
                    <div>{userBookmarks.length >= 1 && <BookmarkList bookmarks={userBookmarks} />}</div>
                    {userBookmarks.length <= 0 && <h6>Seems you don't have any bookmarks yet.</h6>}
                    {apiError && <p>Could not fetch any bookmarks.</p>}
                </div>
            </div>
        )
    }
}

export default Bookmarks