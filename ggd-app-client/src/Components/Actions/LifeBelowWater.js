import React, { useState, useEffect } from 'react'
import '../Actions/actions.css';
import 'bootstrap/dist/css/bootstrap.css';
import { List } from "semantic-ui-react";
import { createUserActions, deleteUserActionByCreatedBy } from '../UserProfile/UserAPI';
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import Auth from '../../Auth';

const WaterActionsItem = (props) => {
    const [Action, setAction] = useState(false);
    const { water, favourites } = props;

    useEffect(() => {
        for (var i = 0; i < favourites.length; i++) {
            if (favourites[i].title === water.title) {
                setAction(true);
                break;
            }
        }
    }, [favourites]);

    //add user action
    const addAction = () => {
        if (createUserActions(water)) {
            setAction(true);
        } else {
            console.log("failed to add Action to your profile");
        }
    }

    const removeAction = () => {
        if (deleteUserActionByCreatedBy (water)) {
            setAction(false);
            console.log("deleted");   
        } else {
            console.log("failed to delete Action from your profile");
        }
    }

    return (
        <div className="actions-card" style={{ textAlign: 'left' }}>
            <h4 style={{ fontWeight: 'bold' }}>{water.title}</h4>
            <h5>{water.description}</h5>
            {Auth.isAuthenticated() &&
                <div className="action-button">
                    {!Action ?
                        <button className="btn btn-light action-favorite-button" type="button" actions={water} onClick={() => addAction()}>
                        <AiOutlineStar
                        type="submit"
                        title="Add to Actions"
                        alt={water.title}
                        style={{ cursor: 'pointer' }}
                        />
                    </button>
                    :
                    <button className="btn btn-light action-favorite-button" type="button" actions={water} onClick={() => removeAction()}> 
                        <AiFillStar
                        type="submit"
                        title="Delete Actions"
                        alt={water.title}
                        style={{ cursor: 'pointer' }}
                        />
                    </button>
                    }
                </div>
            }
        </div>
    )
}
const WaterActionsList = (props) => {
    const { water, favourites } = props;
    return (
        <List divided className="action-list">
            <h3 style={{ fontWeight: 'bold', textAlign: 'center', paddingTop: '10px', color: '#0a97d9' }}> What you can do to help Life Below Water: </h3>
            {water.map((water, index) => ( //iterate through each action
                <WaterActionsItem water={water} key={water.title + index} favourites={favourites}/>
            ))}
        </List>
    );
};

export default WaterActionsList;