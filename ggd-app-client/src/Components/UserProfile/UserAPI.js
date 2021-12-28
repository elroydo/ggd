import { SERVER_URL } from "../../Constants/Constants";
import Swal from 'sweetalert2';

function successModal() {
  Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Request fullfilled.'
  })
}

function errorModal() {
  Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Please try again.'
  })
}

//get user jwt bearer key from session storage
export function updateCredentials() {
  const token = sessionStorage.getItem("jwtAccessToken");
  return token;
}

//get user details using the jwt authorisation key
export const getUserDetails = async () => {
  const username = sessionStorage.getItem("user"); //get username
  const response = await fetch(SERVER_URL + "user/" + username, { //back-end resource url
    method: "GET",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: updateCredentials(),
    },
  });
  const json = await response.json();
  return json;
};
//update user details
export const updateUserDetails = async (props) => {
  const userID = props.id,
    user = {
      id: props.id,
      username: props.username,
      password: props.password,
      role: props.role,
      email: props.email,
      forename: props.forename,
      surname: props.surname,
    };
  await fetch(SERVER_URL + "user/update-user/" + userID, {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: updateCredentials(),
    },
    body: JSON.stringify(user), //convert object to json format and put into body
  })
  .then((response) => {
    if (response.ok) {
      successModal();
      console.log("Successfully updated user details.");
      return true;
    }
  })
  .catch(function (error) {
    errorModal();
    console.log("Error :", error);
    console.log("Failed to update user details.");
    return false;
  });
};

//get user bookmarks
export const getUserBookmarks = async () => {
  const username = sessionStorage.getItem("user");
  const response = await fetch(SERVER_URL + "user/" + username + "/bookmarks", {
    method: "GET",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: updateCredentials(),
    },
  });
  const json = await response.json();
  return json;
};

//create a user bookmark
export const createUserBookmark = async (props) => {
  //assign data from props article and bookmark objects
  var success = false;
  const username = sessionStorage.getItem("user"),
    article = props.article,
    bookmark = {
      title: article.title,
      description: article.description,
      url: article.url,
      sourceName: article.source.name,
      publishedAt: article.publishedAt.split("T")[0],
    };
  await fetch(SERVER_URL + "user/" + username + "/create-bookmark", {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: updateCredentials(),
    },
    body: JSON.stringify(bookmark), //convert object to a json format as put in body
  })
  .then((response) => {
    if (response.status===200) {
      success = true;
    } else {
      errorModal();
      console.log("Failed to bookmark.");
    }
  })
  .catch(function (error) {
    console.log("Error :", error);
    console.log("Something went wrong.");
  });
  return success;
};

//delete user bookmark
export const deleteUserBookmark = async (props) => {
  var success = false;
  const username = sessionStorage.getItem("user"), //get username
  bookmark = {
    title: props.title,
    description: props.description,
    url: props.url,
    sourceName: props.source.name,
    publishedAt: props.publishedAt.split("T")[0],
  };
  await fetch(SERVER_URL + "user/" + username + "/delete-bookmark", { //back-end resource url
    method: "DELETE",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: updateCredentials(),
    },
    body: JSON.stringify(bookmark)
  }).then((response) => {
    if (response.status===200) {
      success = true;
    } else {
      errorModal();
      console.log("Failed to delete bookmark.");
    }
  })
  .catch(function (error) {
    console.log("Error :", error);
    console.log("Something went wrong.");
  });
  return success;
};

//delete user bookmark
export const deleteUserBookmarkByID = async (props) => {
  console.log(props);
  var success = false;
  const username = sessionStorage.getItem("user"), bookmarkID = props.bookmarkId; //get username
  await fetch(SERVER_URL + "user/" + username + "/delete-bookmark/" + bookmarkID, { //back-end resource url
    method: "DELETE",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: updateCredentials(),
    },
    body: JSON.stringify(props)
  }).then((response) => {
    if (response.status===200) {
      success = true;
    } else {
      errorModal();
      console.log("Failed to delete bookmark.");
    }
  })
  .catch(function (error) {
    console.log("Error :", error);
  });
  return success;
};

//save the calculator results
export const saveCalculatorResults = async (props) => {
  //assign data values to objects
  const username = sessionStorage.getItem("user"),
    results = props,
    calculatorResults = {
      resultTonnes: results.tonnes,
      emissionOne: results.emissions[0],
      emissionTwo: results.emissions[1],
      emissionThree: results.emissions[2],
      emissionFour: results.emissions[3],
      emissionFive: results.emissions[4],
      dateCompleted: results.timeCompleted,
    };
  await fetch(SERVER_URL + "user/" + username + "/save-result", {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: updateCredentials(),
    },
    body: JSON.stringify(calculatorResults), //convert object to json format and put into body
  })
  .then((response) => {
    if (response.ok) {
      successModal();
      console.log("Successfully saved result.");
      return true;
    } else {
      errorModal();
      console.log("Failed to save results.");
      return false;
    }
  })
  .catch(function (error) {
    errorModal() 
    console.log("Error :", error);
  });
};

//get calculator results
export const getCalculatorResults = async () => {
  const username = sessionStorage.getItem("user");
  const response = await fetch(SERVER_URL + "user/" + username + "/get-result", {
    method: "GET",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: updateCredentials(),
    },
  });
  const json = await response.json();
  return json;
};

//get user actions
export const getUserActions = async () => {
  const username = sessionStorage.getItem("user");
  const response = await fetch(SERVER_URL + "user/" + username + "/actions", {
    method: "GET",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: updateCredentials(),
    },
  });
  const json = await response.json();
  return json;
};

//get all user actions
export const getAllActions = async () => {
  const response = await fetch(SERVER_URL + "actions", {
    method: "GET",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  const json = await response.json();
  return json;
};

//create a user action
export const createUserActions = async (props) => {
  const username = sessionStorage.getItem("user"),
    action = {
      section: props.section,
      title: props.title,
      description: props.description,
      createdBy: "user"
    };
  await fetch(SERVER_URL + "user/" + username + "/create-actions", {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: updateCredentials(),
    },
    body: JSON.stringify(action),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Successfully added action.");
        return true;
      }
    })
    .catch(function (error) {
      console.log("Error :", error);
      console.log("Failed to add action.");
      return false;
    });
};

//delete user action
export const deleteUserActions = async (props) => {
  var success = false;
  const username = sessionStorage.getItem("user"),  //get username
  action = {
    section: props.section,
    title: props.title,
    description: props.description,
    createdBy: "ggd"
  };
   await fetch(SERVER_URL + "user/" + username + "/delete-actions" , { //back-end resource url
    method: "DELETE",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: updateCredentials(),
    },
        body: JSON.stringify(action)
    }).then((response) => {
          if (response.status===200) {
            console.log("deleted action."); 
                success = true;
      } else {
        errorModal();
        console.log("Failed to delete action.");     
      }
    })
    .catch(function (error) {
      console.log("Error :", error);
      console.log("Something went wrong.");
    });
    return success;
};

//delete user action
export const deleteUserActionByCreatedBy = async (props) => {
  console.log(props);
  var success = false;
  const username = sessionStorage.getItem("user"), actionID = props.actionId; //get username
  await fetch(SERVER_URL + "user/" + username + "/delete-action/" + actionID, { //back-end resource url
    method: "DELETE",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: updateCredentials(),
    },
    body: JSON.stringify(props)
  }).then((response) => {
    if (response.status===200) {
      success = true;
      console.log("delete Action.");
    } else {
      errorModal();
      console.log("Failed to delete Action.");
    }
  })
  .catch(function (error) {
    console.log("Error :", error);
  });
  return success;
};

//post message to the forum
export const postMessage = async (props) => {
  const user = await getUserDetails(),
    chatMessage = props,
    message = {
      forename: user.forename,
      username: user.username,
      message: chatMessage,
      timestamp: Date().toLocaleString(),
    };
  await fetch(SERVER_URL + "user/" + user.username + "/post-message", {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: updateCredentials(),
    },
    body: JSON.stringify(message),
  })
    .then((response) => {
      if (response.ok) {
        //    alert("Sucessfully posted message");
        return true;
      } else {
        errorModal();
        console.log("Failed to post your message.")
      }
    })
    .catch(function (error) {
      console.log("Error :", error);
      //   alert("Failed to post message");
      return false;
    });
};

//get user to-dos
export const getUserToDos = async () => {
  const username = sessionStorage.getItem("user");
  const response = await fetch(SERVER_URL + "user/" + username + "/todos", {
    method: "GET",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: updateCredentials(),
    },
    body: JSON.stringify(),
  });
  const json = await response.json();
  return json;
};

//create new to-do
export const createUserToDos= async (props) => {
  const username = sessionStorage.getItem("user"),
    todo = {
      id: props.id,
      description: props.description
    };
  await fetch(SERVER_URL + "user/" + username + "/create-todos", {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: updateCredentials(),
    },
    body: JSON.stringify(todo),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Successfully added to-do.");
        return true;
      } else {
        errorModal();
        console.log("Failed to create new To-Do.")
      }
    })
    .catch(function (error) {
      console.log("Error :", error);
      console.log("Failed to add to-do.");
      return false;
    });
  };

  //delete user todo
  export const deleteUserToDoByID = async (props) => {
    console.log(props);
    var success = false;
    const username = sessionStorage.getItem("user"), todoID = props.toDoId; //get username
    await fetch(SERVER_URL + "user/" + username + "/delete-todos/" + todoID, { //back-end resource url
      method: "DELETE",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: updateCredentials(),
      },
      body: JSON.stringify(props)
    }).then((response) => {
      if (response.status===200) {
        success = true;
      } else {
        errorModal();
        console.log("Failed to delete To-Do.");
      }
    })
    .catch(function (error) {
      console.log("Error :", error);
    });
    return success;

//   //delete user todo
// export const deleteUserToDo = async (props) => {
//   var success = false;
//   const username = sessionStorage.getItem("user"), //get username
//   await fetch(SERVER_URL + "user/" + username + "/delete-todos", { //back-end resource url
//     method: "DELETE",
//     headers: {
//       "X-Requested-With": "XMLHttpRequest",
//       Authorization: updateCredentials(),
//     },
//     body: JSON.stringify(todo)
//   }).then((response) => {
//     if (response.status===200) {
//       success = true;
//       console.log("Successfully deleted todo")
//     } else {
//       console.log("Failed to delete todo.");
//     }
//   })
//   .catch(function (error) {
//     console.log("Error :", error);
//     alert("Something went wrong.");
//   });
//   return success;
// };

};