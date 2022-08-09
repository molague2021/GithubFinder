import { useReducer, createContext } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  // Commenting out this code, since we will be using reducers instead of useState
  //   const [users, setUsers] = useState([]);
  //   const [loading, setLoading] = useState(true);

  // Creating an initial state
  const initialState = {
    users: [],
    user: {},
    loading: false,
  };

  // Use the useReducer hook, which returns two things state and dispatch
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // FETCH USERS: Get initial users for testing purposes
  const fecthUsers = async () => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: data,
    });
  };

  // Get search users
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

    const { items } = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  // Get search users
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`);

    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();

      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
  };

  // Get user repos
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`
    );

    const data = await response.json();

    dispatch({
      type: 'GET_USER_REPOS',
      payload: data,
    });
  };

  const setLoading = () => {
    dispatch({ type: 'SET_LOADING' });
  };

  // clear users from state
  const removeUsers = () => {
    dispatch({ type: 'REMOVE_USERS' });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos,
        fecthUsers,
        getUser,
        getUserRepos,
        searchUsers,
        removeUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
