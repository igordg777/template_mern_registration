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

export const AddPhotoAC = photo => {
  return {
    type: ADD_PHOTO,
    photo,
  };
};

export const AddIsLogin = toogle => {
  return {
    type: ADD_ISLOGIN,
    isLogin: toogle,
  };
};

export const EditProfilePageAC = newProfile => {
  return {
    type: EDIT_PROFILE,
    user: newProfile,
  };
};

export const AddUserAC = user => {
  return {
    type: ADD_USER,
    user,
  };
};

export const AddUsersDashBoard = users => {
  return {
    type: ADD_USERS_DASHBOARD,
    users,
  };
};

export const CleanReduxAC = () => {
  return {
    type: CLEAN_REDUX,
  };
};

export const SetPriority = priority_list => {
  return {
    type: SET_PRIORITY,
    priority_list: priority_list,
  }
}

export const SetFlightDirection = flight_direction => {
  return {
    type: SET_FLIGHT_DIRECTION,
    flight_direction: flight_direction,
  }
}

export const SetDayTime = daytime => {
  return {
    type: SET_DAY_TIME,
    daytime: daytime,
  }
}