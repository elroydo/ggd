import React, { useState, useEffect } from 'react'
import '../Actions/actions.css';
import 'bootstrap/dist/css/bootstrap.css';
import { List } from "semantic-ui-react";
import { createUserActions, deleteUserActionByCreatedBy } from '../UserProfile/UserAPI';
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import Auth from '../../Auth';

const LandActionItem = (props) => {
    const [Action, setAction] = useState(false);
    const { land, favourites } = props;

    useEffect(() => {
        for (var i = 0; i < favourites.length; i++) {
            if (favourites[i].title===land.title) {
                setAction(true);
                break;
            }
        }
    }, [favourites]);

    //add user action
    const addAction = () => {
        if (createUserActions(land)) {
            setAction(true);
        }
        else {
            console.log("failed to add Action to your profile");
        }
    }

    const removeAction = () => {
        if (deleteUserActionByCreatedBy(land)) {
            setAction(false);
        } else {
            console.log("failed to delete Action from your profile");
        }
    }

    return (
        <div className="actions-card" style={{ textAlign: 'left' }}>
            <h4 style={{ fontWeight: 'bold' }}>{land.title}</h4>
            <h5>{land.description}</h5>
            {Auth.isAuthenticated() &&
                <div className="action-button">
                    {!Action ?
                        <button className="btn btn-light action-favorite-button" type="button" actions={land} onClick={() => addAction()}>
                        <AiOutlineStar
                        type="submit"
                        title="Add to Actions"
                        alt={land.title}
                        style={{ cursor: 'pointer' }}
                        />
                    </button>
                    :
                    <button className="btn btn-light action-favorite-button" type="button" actions={land} onClick={() => removeAction()}> 
                        <AiFillStar
                        type="submit"
                        title="Delete Actions"
                        alt={land.title}
                        style={{ cursor: 'pointer' }}
                        />
                    </button>
                    }
                </div>
            }
        </div>
    )
}

const LandActionList = (props) => {
    const { land, favourites } = props;
    return (
        <List divided className="action-list">
            <h3 style={{ fontWeight: 'bold', textAlign: 'center', paddingTop: '10px', color: 'rgb(85, 192, 43)' }}> What you can do to help fight Land Change: </h3>
            {land.map((land, index) => ( //iterate through each action
                <LandActionItem land={land} key={land.title + index}  favourites={favourites}/>
            ))}
        </List>
    );
};

export default LandActionList;