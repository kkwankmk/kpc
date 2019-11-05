const initState = {
  users: []
};

export const createUser = ({ data }) => {
  return {
    type: "CREATE_USER",
    payload: { data }
  };
};

export const updateUser = ({ data }) => {
  return {
    type: "UPDATE_USER",
    payload: { data }
  };
};

export const deleteUsers = ids => {
  return {
    type: "DELATE_USERS",
    payload: { ids }
  };
};

export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case "CREATE_USER":
      return { ...state, users: state.users.concat([action.payload.data]) };

    case "UPDATE_USER":
      const { data } = action.payload;

      const updateUsers = state.users.map(user =>
        user.id === data.id ? data : user
      );

      return { ...state, users: updateUsers };

    case "DELATE_USERS":
      const { ids } = action.payload;
      const newUsers = state.users.filter(user => !ids.includes(user.id));

      return { ...state, users: newUsers };

    default:
      return state;
  }
}
