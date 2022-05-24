import { ReactElement } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

function GetMessages(): ReactElement {
  const { username } = useParams();
  const navigate = useNavigate();

  const GET_MESSAGES = gql`
    query GetMessages($username: ID!) {
      user(username: $username) {
        messages {
          id
          body
        }
      }
    }
  `;

  interface Message {
    id: number;
    body: string;
  }

  interface Messages {
    messages: Message[];
  }

  interface User {
    user: Messages;
  }

  const { loading, error, data } = useQuery<User>(GET_MESSAGES, {
    variables: { username: username },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  let messages = (
    <div>
      {data &&
        data.user.messages.map((msg) => (
          <div key={msg.id}>
            <p>{msg.body}</p>
          </div>
        ))}
    </div>
  );

  return (
    <div>
      {messages}
      <div>
        <button onClick={() => navigate(`/${username}/addmessage`)}>
          Add message
        </button>
      </div>
    </div>
  );
}

export default GetMessages;
