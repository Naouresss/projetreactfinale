interface User {
  id: number;
  avatar_url: string;
  login: string;
  type: string;
}

interface State {
  users: User[];
  searchTerm: string;
}

interface SetUsersAction {
  type: 'SET_USERS';
  payload: User[];
}

interface SetSearchTermAction {
  type: 'SET_SEARCH_TERM';
  payload: string;
}

export type ActionType = SetUsersAction | SetSearchTermAction;

const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

export default reducer;
