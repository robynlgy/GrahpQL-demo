import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

function NewMessageForm() {

  const { username }  = useParams();

  const initialValue = {
    body: ""
  };
  const [formData, setFormData] = useState(initialValue);
  const navigate = useNavigate();

  const CREATE_MESSAGE = gql`
  mutation createMessage{
    createMessage(
      username: "${username}",
      body: "${formData.body}"
      ){
        id
        body
      }
  }`;

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

  const [createMessage, { data, loading, error }] = useMutation(CREATE_MESSAGE,{
    refetchQueries: [
      GET_MESSAGES, // DocumentNode object parsed with gql
      'GetMessages' // Query name
    ],
  });
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Call parent function. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await createMessage();
      navigate(`/${username}/messages`);
    } catch (err) {
      console.log("err.message", err.message);
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