import {
  CLEAR_PROGILE,
  GET_PROGILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_PROGILES,
  GET_REPOS,
} from "../action/type";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROGILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };

    case GET_PROGILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };

    case CLEAR_PROGILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    default:
      return state;
  }
}
