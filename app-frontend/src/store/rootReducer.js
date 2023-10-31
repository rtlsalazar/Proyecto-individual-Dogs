/*-----------------------------------------------------------------------------------------*/
/* Initial State. */
/*-----------------------------------------------------------------------------------------*/
const initialState = {
  prefered_order:{"type": "", "way": ""},
  prefered_filter:{"origin": [], "temperament": []},
  list:{"database": [], "api": []}
};

/*-----------------------------------------------------------------------------------------*/
/* Reducers. */
/*-----------------------------------------------------------------------------------------*/
const rootReducer = (currentState = initialState, action) => {
  switch (action.type){

    case "SET_DOGS_LIST":{
      return {...currentState, list:action.payload};
    }

    case "SET_LIST_FILTER":{
      return {...currentState, prefered_filter:action.payload};
    }

    case "SET_LIST_ORDER":{
      return {...currentState, prefered_order:action.payload};
    }

    default: {
      return currentState;
    }
  }
};

export default rootReducer;
