import {
  DECREMENT,
  DELETE_DIVISION,
  FETCH_DIVISION,
  INCREMENT,
  POST_DIVISION,
  PUT_DIVISION,
  SET_ISLOADING_EDIT_FALSE,
  SET_ISLOADING_FALSE,
} from "../actions/divisionActions";

const initialState = {
  count: 0,
  division: [],
  isLoading: false,
  isLoadingEdit: false,
};

const divisionReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_DIVISION:
      return {
        ...state,
      };
    case PUT_DIVISION:
      return {
        ...state,
        division: [...state.division, action.payload],
        isLoadingEdit: action.isLoadingEdit,
      };
    case SET_ISLOADING_EDIT_FALSE:
      return {
        ...state,
        isLoadingEdit: false,
      };
    case SET_ISLOADING_FALSE:
      return {
        ...state,
        isLoading: false,
      };
    case POST_DIVISION:
      return {
        ...state,
        division: [...state.division, action.payload],
        // division: action.payload,
        isLoading: action.isLoading,
      };
    case FETCH_DIVISION:
      return {
        ...state,
        division: action.payload,
      };
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default divisionReducer;
