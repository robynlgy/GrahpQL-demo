import { useState, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

function NewUserForm(): ReactElement | string {
  const initialValue = {
    username: "",
    firstName: "",
    lastName: "",
  };
  const [formData, setFormData] = useState(initialValue);
  const navigate = useNavigate();

  const CREATE_USER = gql`
    mutation createUser(
      $username: ID!,
      $first_name: String!,
      $last_name: String!
    ) {
      createUser(
        username: $username,
        first_name: $first_name,
        last_name: $last_name
      ) {
        username
      }
    }
  `;

  const GET_USERS = gql`
    query GetUsers {
      users {
        username
      }
    }
  `;

  interface IUser {
    username: string;
  }

  const [createUser, { data, loading, error }] = useMutation<{
    createUser: IUser;
  }>(CREATE_USER, {
    variables: {
      username: formData.username,
      first_name: formData.firstName,
      last_name: formData.lastName,
    },
    refetchQueries: [GET_USERS, "GetUsers"],
  });
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  /** Update form input. */
  function handleChange(evt:React.ChangeEvent<HTMLInputElement>) {
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
      await createUser();
      navigate("/users");
    } catch (err) {
      if (err instanceof Error) {
        console.log("err.message", err.message);
      }
      console.log("unexpected error:", err);
    }
  }

  const formInputsHTML = (
    <div className="mb-3">
      <label htmlFor="signup-username">Username: </label>
      <input
        id="signup-username"
        name="username"
        className="form-control"
        placeholder="Enter username"
        onChange={handleChange}
        value={formData.username}
        aria-label="signup-form-username"
      />
      <label htmlFor="signup-firstName">First Name: </label>
      <input
        id="signup-firstName"
        name="firstName"
        className="form-control"
        placeholder="Enter First Name"
        onChange={handleChange}
        value={formData.firstName}
        aria-label="signup-form-firstName"
      />
      <label htmlFor="signup-lastName">Last Name: </label>
      <input
        id="signup-lastName"
        name="lastName"
        className="form-control"
        placeholder="Enter Last Name"
        onChange={handleChange}
        value={formData.lastName}
        aria-label="signup-form-lastName"
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

export default NewUserForm;
