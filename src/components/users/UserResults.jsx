import {useEffect, useContext} from 'react';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import GithubContext from '../../context/github/GithubContext';

function UserResults() {
    // Moving these to context, use to be used here for useState.
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const fecthUsers = async () => {
    //     const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
    //         headers: {
    //             Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    //         }
    //     });

    //     const data = await response.json();

    //     setUsers(data);
    //     setLoading(false);
    // }

    // Bringing in these from useContext instead of using the data here
    const {
        users, 
        loading,
        // fetchUser //// Removing as it doesnt need to be here anymore
    } = useContext(GithubContext);

    // Calling fetch users a different way, using a the user search component
    // useEffect(() => {
    //     fecthUsers();
    // }, [])

    if(!loading){
        return (
            <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
                {users.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
          )
    } else {
        return <Spinner />
    }
  
}

export default UserResults