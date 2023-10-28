/*-----------------------------------------------------------------------------------------*/
/* Initial State. */
/*-----------------------------------------------------------------------------------------*/
const initialState = {"database": [], "api": []};

/*-----------------------------------------------------------------------------------------*/
/* Reducers. */
/*-----------------------------------------------------------------------------------------*/
const rootReducer = (currentState = initialState, action) => {
  switch (action.type){

    case "SET_DOGS_LIST":{
      return action.payload;
    }

    default: {
      return currentState;
    }
  }
};

export default rootReducer;
