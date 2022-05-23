import { Link } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const GET_USERS = gql`
query GetUsers {
  users{
    username
  }
}
`;

function GetUsers(){
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  return data.users.map((user) => (
    <Link to={`/${user.username}/messages`}>
    <div key={user.username}>
      <p>
        {user.username}
      </p>
    </div>
    </Link>
  ));

}

export default GetUsers;