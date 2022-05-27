let initstate = {
  //initstate object which store's temporary data related to users
  users: [],
  profile: {},
  currentUser: {},
  authError: false,
};

export default function (state = initstate, action) {
  switch (
    action.type //checking the action type which was dispatched from the action
  ) {
    case "ADD_USER":
      if (action.payload === "ALREADY_EXISTS") {
        return {
          //returning the state after modifying it
          ...state,
          authError: true,
        };
      } else {
        return {
          ...state,
          users: [action.payload, ...state.users],
          profile: action.currentUser,
          authError: false,
        };
      }
    case "LOGIN":
      if (action.payload === "AUTHERROR") {
        console.log("authError");
        return {
          ...state,
          authError: true,
        };
      } else {
        return {
          ...state,
          authError: false,
          profile: action.payload,
        };
      }
    case "LOGOUT":
      return {
        ...state,
        authError: false,
        profile: {},
      };
    case "UPDATE_USER":
      return {
        ...state,
        profile: action.payload.user,
      };
    case "GET_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
