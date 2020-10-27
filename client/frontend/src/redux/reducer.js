import {
  ADD_PHOTO,
  ADD_ISLOGIN,
  EDIT_PROFILE,
  ADD_USER,
  ADD_USERS_DASHBOARD,
  CLEAN_REDUX,
  SET_PRIORITY,
  SET_FLIGHT_DIRECTION,
  SET_DAY_TIME,
} from "./type";

const initialState = {
  photos: [],
  isLogin: false,
  user: {},
  usersDashBoard: [],
  priority: [],
  flight_direction: [],
  daytime: [],
};

export default function(oldState = initialState, action) {
  switch (action.type) {
    case ADD_PHOTO:
      return {
        ...oldState,
        photos: action.photo,
      };

    case ADD_ISLOGIN:
      return {
        ...oldState,
        isLogin: action.isLogin,
      };

    case EDIT_PROFILE:
      return {
        ...oldState,
        user: action.user,
      };

    case ADD_USER:
      return {
        ...oldState,
        user: action.user,
      };
    case ADD_USERS_DASHBOARD:
      return {
        ...oldState,
        usersDashBoard: action.users,
      };
    case CLEAN_REDUX: {
        console.log('CLEANING REDUX');
        return {
          photos: [],
          isLogin: false,
          user: {},
          usersDashBoard: [],
        };
      }
    case SET_PRIORITY:
      return {
        ...oldState,
        priority: action.priority_list,
      };
    case SET_FLIGHT_DIRECTION:
      return {
        ...oldState,
        flight_direction: action.flight_direction,
      }
    case SET_DAY_TIME:
      return {
        ...oldState,
        daytime: action.daytime,
      }

    default:
      return oldState;
  }
}
