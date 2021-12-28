import React, { useState, useEffect } from 'react'
import '../Actions/actions.css';
import 'bootstrap/dist/css/bootstrap.css';
import { List } from "semantic-ui-react";
import { createUserActions, deleteUserActionByCreatedBy } from '../UserProfile/UserAPI';
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import Auth from '../../Auth';

const ClimateActionItem = (props) => {
    const [Action, setAction] = useState(false);
    const { climate, favourites } = props;

        useEffect(() => {
            for (var i = 0; i < favourites.length; i++) {
                if (favourites[i].title === climate.title) {
                    setAction(true);
                    break;
                }
            }
        }, [favourites]);

        //add user action
        const addAction = () => {
            if (createUserActions(climate)) {
                setAction(true);
            }
            else {
                console.log("failed to add Action to your profile");
            }
        }

        const removeAction = () => {
            if (deleteUserActionByCreatedBy(props.climate)) {
                setAction(false);
            } else {
                console.log("failed to delete Action from your profile");
            }
        }

        return (
            <div className="actions-card" style={{ textAlign: 'left' }}>
                <h4 style={{ fontWeight: 'bold' }}>{climate.title}</h4>
                <h5>{climate.description}</h5>
                {Auth.isAuthenticated() &&
                    <div className="action-button">
                        {!Action ?
                        <button className="btn btn-light action-favorite-button" type="button" actions={climate} onClick={() => addAction()}>
                            <AiOutlineStar
                            type="submit"
                            title="Add to Actions"
                            alt={climate.title}
                            style={{ cursor: 'pointer' }}
                            />
                        </button>
                        :
                        <button className="btn btn-light action-favorite-button" type="button" actions={climate} onClick={() => removeAction()}> 
                            <AiFillStar
                            type="submit"
                            title="Delete Actions"
                            alt={climate.title}
                            style={{ cursor: 'pointer' }}
                            />
                        </button>
                        }
                    </div>
                }
            </div>
        )
}

const ClimateActionList = (props) => {
    const { climate, favourites } = props;
    return (
        <List divided className="action-list">
            <h3 style={{ fontWeight: 'bold', textAlign: 'center', paddingTop: '10px', color: 'rgb(63, 126, 68)' }}> What you can do to help fight Climate Change: </h3>
            {climate.map((climate, index) => ( //iterate through each action
                <ClimateActionItem climate={climate} key={climate.title + index} favourites={favourites} />
            ))}
        </List>
    );
};

export default ClimateActionList;