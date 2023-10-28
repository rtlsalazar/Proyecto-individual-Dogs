import api from "@/services/api.js";


/*-----------------------------------------------------------------------------------------*/
/* Action Creators. */
/*-----------------------------------------------------------------------------------------*/
export const getAllDogs = () => {
  return async function (dispatch){
    var dogsList = await api.load_list();
    return dispatch({ type: "SET_DOGS_LIST", payload: dogsList });
  }
};


export const getDogsByName = (name) => {
  return async function (dispatch){
    var dogsList = await api.search_by_name(name);
    return dispatch({ type: "SET_DOGS_LIST", payload: dogsList });
  }
};

