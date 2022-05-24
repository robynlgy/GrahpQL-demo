import React, { useState, ReactElement } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

function NewMessageForm(): ReactElement | string {
  const { username } = useParams();

  const initialValue = {
    body: "",
  };
  const [formData, setFormData] = useState(initialValue);
  const navigate = useNavigate();

  const CREATE_MESSAGE = gql`
  mutation createMessage ($username: ID!, $body: String!){
    createMessage (username: $username, body: $body){
        id
        body
      }
  }`;

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

  // interface NewMessage {
  //   username: string;
  //   body: string;
  // }


  const [createMessage, { data, loading, error }] = useMutation<{ createMessage: Message }>(
    CREATE_MESSAGE,
    {
      variables: { username: username, body: formData.body },
      refetchQueries: [GET_MESSAGES, "GetMessages"],
    }
  );
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  /** Update form input. */
  function handleChange(evt: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Call parent function. */
  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    try {
      await createMessage();
      navigate(`/${username}/messages`);
    } catch (err) {
      if (err instanceof Error) {
        console.log("err.message", err.message);
      }
      console.log("unexpected error:", err);
    }
  }

  const formInputsHTML = (
    <div className="mb-3">
      <label htmlFor="signup-username">Type your message here: </label>
      <textarea
        id="signup-body"
        name="body"
        className="form-control"
        placeholder="Enter your message here"
        onChange={handleChange}
        value={formData.body}
        aria-label="signup-form-body"
      />
    </div>
  );

  return (
    <form
      className="justify-content-center container bg-light"
      onSubmit={handleSubmit}
    >
      {formInputsHTML}

      <button className="SignupForm-Btn btn-primary btn ms-3 py-1 btn-sm">
        Submit
      </button>
    </form>
  );
}

export default NewMessageForm;
