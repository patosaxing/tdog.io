import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  myVideosListReducer,
  videoDetailsReducer,
  videoDeleteReducer,
  videoCreateReducer,
  videoUpdateReducer,
  videoReviewCreateReducer,
  // videoTopRatedReducer,
} from './reducers/videoReducers'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
  myVideosList: myVideosListReducer,
  videoDetails: videoDetailsReducer,
  videoDelete: videoDeleteReducer,
  videoCreate: videoCreateReducer,
  videoUpdate: videoUpdateReducer,
  videoReviewCreate: videoReviewCreateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});


// use local storage for storing loggED in Token
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null


  const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
  };

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;