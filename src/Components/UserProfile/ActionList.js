import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { List } from "semantic-ui-react";
import '../Actions/actions.css';
import { RiCloseCircleLine } from 'react-icons/ri'
import { deleteUserActionByCreatedBy } from './UserAPI';

const ActionItem = (props) => {
    const { action } = props;

    const deleteItem = () => {
        if (deleteUserActionByCreatedBy(action)) {
            //window.location.reload(true);
            console.log("deleted");
        } else {
            console.log("no");
        }
    }
    return (
        <div>
            <div className="actions-list">
                    <div className="actions-card" style={{maxWidth: '95%'}} >
                        <h4 style={{fontWeight:'bold'}}>{action.title}</h4>
                        <h5>{action.description}</h5>
                        <div> 
                            <button button className="btn btn-light action-favorite-button" type="button" action={action} onClick={() => deleteItem()}> 
                            <RiCloseCircleLine 
                                className='delete-icon'
                                alt={action.description}  
                                style={{ cursor: 'pointer' }}
                            />
                        </button>
                        </div>
                        </div>
                    </div>
                </div>
    );
};

const ActionList = (props) => {
    return (
    <List divided>
        {props.actions.map((action, index) => ( //iterate through each action
            <ActionItem action={action} key={action.title + index} />
        ))}
    </List>
    );
};

export default ActionList;
