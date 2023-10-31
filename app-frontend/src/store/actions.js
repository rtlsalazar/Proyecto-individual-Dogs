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

export const setFilteringState = (prefered_filter) => {
  return async function (dispatch){
    var dogsList = await api.search_by_name(name);
    return dispatch({ type: "SET_LIST_FILTER", payload: prefered_filter });
  }
};

export const setOrderingState = (prefered_order) => {
  return async function (dispatch){
    var dogsList = await api.search_by_name(name);
    return dispatch({ type: "SET_LIST_ORDER", payload: prefered_order });
  }
};

