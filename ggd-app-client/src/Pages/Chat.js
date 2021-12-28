import React, { useState, useEffect } from "react";
import { getChat } from "../Components/Chat/ChatAPI";
import MessageList from "../Components/Chat/MessageList";
import { postMessage } from "../Components/UserProfile/UserAPI";

function Chat() {
  const [chatMessages, fetchMessages] = useState([]); //decalring state variables and a function that allows us to modify it later
  const [message, setMessage] = useState("");
  const [apiError, setError] = useState("");
  const [reload, doReload] = useState(false);

  async function getMessages() {
    try { //fetch message from the backend
      const responseChat = await getChat();
      fetchMessages(responseChat);
      doReload(false);
    } catch (error) { //if any error is thrown, catch it and create an error message
      setError("Could not find any messages");
    }
  }

  useEffect(() => { //runs before rendering the chat / rerender if there is any changes
    // console.log("chrome sucks yo") xD
    //if(reload) window.location.reload(false);
    getMessages();
  }, [reload]);

  function handleClick(e) {
    postMessage(message);
    getMessages();
    doReload(true);
    e.preventDefault();
  }

  return (
    <div className="main">
      <div className="page-heading" style={{ paddingTop: 30, paddingBottom: 10 }}>
        {apiError && <p style={{ textAlign: 'center', color: 'red' }}>Could not fetch any messages.</p>}
        <h3 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Chatty huh?</h3>
        <div className="chat">
          <div>
            {chatMessages.length >= 1 && (
              <MessageList messages={chatMessages} />
            )}
          </div>
          {chatMessages.length <= 0 && (
            <h6>No one here unfortunately...</h6>
          )}
          <div className="post-message-container">
            <div className="post-message">
              <form>
                <div className="form-group">
                  <label style={{ fontSize: "2rem", fontWeight: "bold", paddingTop: 20, paddingBottom: 10 }}>Join in on the conversation!</label>
                  <textarea className="form-control" id="post-message-text-area" rows="3" style={{ borderRadius: 30, padding: 20 }} onChange={e => setMessage(e.target.value)}></textarea>
                  <div>
                    <button style={{ width: "30%", marginTop: 20 }} className="btn btn-light login-button"
                      onMouseDown={handleClick} type="submit">Send
                      </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
export default Chat;
