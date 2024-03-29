import { storeTools } from "../../../_DATA";
import { Alert } from "react-native";

export const RECEIVE_TOOLS = "RECEIVE_TOOLS";
export const REORDER_TOOLS = "REORDER_TOOLS";
export const EDIT_VISIBILITY = "EDIT_VISIBILITY";
export const FAVORITE_TOOLS = "FAVORITE_TOOLS";
//export const DELETE_ACCOUNT = "DELETE_ACCOUNT";

export function receiveTools(tools) {
  return {
    type: RECEIVE_TOOLS,
    tools,
  };
}

export function favoriteTools(tools) {
  return {
    type: FAVORITE_TOOLS,
    tools,
  };
}

export function reorderTools(tools) {
  return {
    type: REORDER_TOOLS,
    tools,
  };
}

export function editVis(tools) {
  return {
    type: EDIT_VISIBILITY,
    tools,
  };
}

export function handleFavoriteTools(tools, oldTools) {
  return (dispatch) => {
    dispatch(favoriteTools(tools));
    try {
      storeTools(JSON.stringify(tools), "favoriteTools").then(() => {});
    } catch {
      (e) => {
        dispatch(editVis(oldTools));
        Alert.alert(
          "Error: Unable to favorite tool",
          "Please connect with the developer, developer socials in the Settings",
          [
            {
              text: "Will Do",
              onPress: () => null,
              style: "Ok",
            },
          ]
        );
        console.error("Error: favoriteTools: ", e);
      };
    }
  };
}

export function handleEditVisTools(tools, oldTools) {
  return (dispatch) => {
    dispatch(editVis(tools));
    try {
      storeTools(JSON.stringify(tools), "editVis").then(() => {});
    } catch {
      (e) => {
        dispatch(editVis(oldTools));
        Alert.alert(
          "Error: Unable to hide tool",
          "Please connect with the developer, developer socials in the Settings",
          [
            {
              text: "Will Do",
              onPress: () => null,
              style: "Ok",
            },
          ]
        );
        console.error("Error: handleEditVisTools: ", e);
      };
    }
  };
}

export function handleReorderTools(tools, oldTools) {
  return (dispatch) => {
    dispatch(reorderTools(tools));
    try {
      storeTools(JSON.stringify(tools), "reorderTools").then(() => {});
    } catch (e) {
      dispatch(reorderTools(oldTools));
      Alert.alert(
        "Error: Unable to reorder tools",
        "Please connect with the developer, developer socials in the Settings",
        [
          {
            text: "Will Do",
            onPress: () => null,
            style: "Ok",
          },
        ]
      );
      console.error("Error: handleReorderTools: ", e);
    }
  };
}

// export function deleteAccount(id) {
//   return {
//     type: DELETE_ACCOUNT,
//     id,
//   };
// }
