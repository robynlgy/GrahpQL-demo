import { useParams } from "react-router-dom"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";


function GetMessages(){

  const { username } = useParams();

  const GET_MESSAGES = gql`
  query GetMessages {
    user (username: "${username}") {
      messages{
        id
        body
      }
    }
  }
  `;

  const { loading, error, data } = useQuery(GET_MESSAGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  return data.user.messages.map((msg) => (
    <div key={msg.id}>
      <p>
        {msg.body}
      </p>
    </div>
  ));

}

export default GetMessages;