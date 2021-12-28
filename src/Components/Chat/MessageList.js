import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { List } from "semantic-ui-react";
import Avatar from '../../Images/avatar.png';
import './message.css';

const ChatItem = (props) => {
  const { message } = props; //intialise message variable as data from props
  return (
    <div className="message-container" style={{ textAlign: "left" }}>
      <div className="row mesage" >
        <div className="row message-info" style={{display: "inline", textAlign: "right"}}>
          <div style={{display: "inline"}}>#{message.messageID}</div>
        </div>
        <div className="col-2" style={{borderRight: "1px solid lightgrey", display: "inline", textAlign: "center"}}>
          <div style={{fontSize: "1.1rem", display: "inline"}}>{message.forename}</div>
          <div style={{fontSize: "1.1rem", display: "inline", color: "grey"}}> @{message.username}</div>
          <img className="user-avatar" src={Avatar} alt="Avatar"/>
          <div className="chat-badges">badges</div>
        </div>
        <div className="col">
          <div className="message-content" style={{ position: "inherit", width: "100%", height: "100%"}}>
            {message.message}
          </div>
        </div>
        <div className="row" style={{textAlign: "right"}}>
          <div className="time-stamp">
            Posted on {message.timestamp}
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageList = (props) => {
  return (
    <List divided>
      {props.messages.map((message, index) => ( //iterate through each message
        <ChatItem message={message} key={index} />
      ))}
    </List>
  );
};

export default MessageList;
