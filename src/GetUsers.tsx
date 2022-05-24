import { Link, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users {
      username
    }
  }
`;

interface User {
  username: string;
}

interface Users {
  users: User[];
}

function GetUsers() {
  const { loading, error, data } = useQuery<Users>(GET_USERS);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  return (
    <div>
      <button onClick={() => navigate(`/adduser`)}>
        Add user
      </button>
      <div>
        {data.users.map((user) => (
          <Link key={user.username} to={`/${user.username}/messages`}>
            <p>{user.username}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GetUsers;
