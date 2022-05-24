import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users {
      username
    }
  }
`;

function GetUsers() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  return data.users.map((user) => (
    <Link key={user.username} to={`/${user.username}/messages`}>
      <p>{user.username}</p>
    </Link>
  ));
}

export default GetUsers;
