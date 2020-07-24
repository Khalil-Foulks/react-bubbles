import React, { useState } from "react";
import { useHistory} from "react-router-dom";
import axios from "axios";

const initialState = {
  credentials: {
    username: "",
    password: ""
  }
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formValues, setFormValues] = useState(initialState.credentials)

  let history = useHistory();

  const handleChange = e => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const onSubmitHandler = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", formValues)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        history.push("/bubble-page")
      })
  }


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>

      <div>
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            name="username"
            placeholder = "username here"
            value={formValues.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder = "password here"
            value={formValues.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Login;
