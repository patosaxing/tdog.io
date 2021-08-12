import {
  VIDEO_LIST_REQUEST,
  VIDEO_LIST_SUCCESS,
  VIDEO_LIST_FAIL,
  VIDEO_DETAILS_REQUEST,
  VIDEO_DETAILS_SUCCESS,
  VIDEO_DETAILS_FAIL,
  VIDEO_DELETE_REQUEST,
  VIDEO_DELETE_SUCCESS,
  VIDEO_DELETE_FAIL,
  VIDEO_CREATE_RESET,
  VIDEO_CREATE_FAIL,
  VIDEO_CREATE_SUCCESS,
  VIDEO_CREATE_REQUEST,
  VIDEO_UPDATE_REQUEST,
  VIDEO_UPDATE_SUCCESS,
  VIDEO_UPDATE_FAIL,
  VIDEO_UPDATE_RESET,
  VIDEO_CREATE_REVIEW_REQUEST,
  VIDEO_CREATE_REVIEW_SUCCESS,
  VIDEO_CREATE_REVIEW_FAIL,
  VIDEO_CREATE_REVIEW_RESET,
  PUBLIC_VIDEO_REQUEST,
  PUBLIC_VIDEO_SUCCESS,
  PUBLIC_VIDEO_FAIL,

} from '../constants/videoConstants';

export const myVideosListReducer = (state = { videos: [] }, action) => {
  switch (action.type) {
    case VIDEO_LIST_REQUEST:
      return { loading: true, videos: [] };
    case VIDEO_LIST_SUCCESS:
      return {
        loading: false,
        videos: action.payload,
        // videos: action.payload.videos,
        // pages: action.payload.pages,
        // page: action.payload.page,
      };
    case VIDEO_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const videoDetailsReducer = (
  state = { video: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case VIDEO_DETAILS_REQUEST:
      return { loading: true, ...state };
    case VIDEO_DETAILS_SUCCESS:
      return { loading: false, video: action.payload };
    case VIDEO_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const videoDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case VIDEO_DELETE_REQUEST:
      return { loading: true };
    case VIDEO_DELETE_SUCCESS:
      return { loading: false, success: true };
    case VIDEO_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
export const videoCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VIDEO_CREATE_REQUEST:
      return { loading: true };
    case VIDEO_CREATE_SUCCESS:
      return { loading: false, success: true, video: action.payload };
    case VIDEO_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case VIDEO_CREATE_RESET:
      return {};
    default:
      return state;
  }
}

export const videoUpdateReducer = (state = { video: {} }, action) => {
  switch (action.type) {
    case VIDEO_UPDATE_REQUEST:
      return { loading: true };
    case VIDEO_UPDATE_SUCCESS:
      return { loading: false, success: true, video: action.payload };
    case VIDEO_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case VIDEO_UPDATE_RESET:
      return { video: {} };
    default:
      return state;
  }
}

export const videoReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VIDEO_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case VIDEO_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case VIDEO_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case VIDEO_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
}

export const publicVideosReducer = (state = { videos: [] }, action) => {
  switch (action.type) {
    case PUBLIC_VIDEO_REQUEST:
      return { loading: true, videos: [] };
    case PUBLIC_VIDEO_SUCCESS:
      return {
        loading: false,
        videos: action.payload.videos,
        pages: action.payload.pages,
      };
    case PUBLIC_VIDEO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// export const videoTopRatedReducer = (state = { videos: [] }, action) => {
//   switch (action.type) {
//     case VIDEO_TOP_REQUEST:
//       return { loading: true, videos: [] };
//     case VIDEO_TOP_SUCCESS:
//       return { loading: false, videos: action.payload };
//     case VIDEO_TOP_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// }