import { SERVER_URL } from "../../Constants/Constants";

export const getChat = async () => { //send get chat request to the back-end
  const response = await fetch(SERVER_URL + "chat", {
    method: "GET", //get method required
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  const json = await response.json(); //store json response
  return json;
};
