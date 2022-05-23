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
    usernameeee
  }
}
`;

function GetUsers(){
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  return data.users.map((user) => (
    <div key={user.username}>
      <p>
        {user.username}
      </p>
    </div>
  ));

}

export default GetUsers;