import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ReactElement } from "react";
import { GetUsersDocument,GetUsersQuery } from './generated'

// const GET_USERS = gql`
//   query GetUsers {
//     users {
//       username
//     }
//   }
// `;

// interface User {
//   username: string;
// }

// interface Users {
//   users: User[];
// }

function GetUsers(): ReactElement {
  const {data} = useQuery<GetUsersQuery>(GetUsersDocument)
  // const { loading, error, data } = useQuery<Users>(GET_USERS);
  const navigate = useNavigate();

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :( {error.message}</p>;

  return (
    <div>
      <button onClick={() => navigate(`/adduser`)}>Add user</button>
      <div>
        {data && data.users && data.users.map((user) => (
            <Link key={user.username} to={`/${user.username}/messages`}>
              <p>{user.username}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default GetUsers;
