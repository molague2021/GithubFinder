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

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
