import { SERVER_URL } from "../../Constants/Constants";

//get actions
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

