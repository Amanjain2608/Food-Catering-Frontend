import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const [credentials, setcredentials] = useState({
    email: "",
    password: ""
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "Post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter the valid credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"))
     navigate("/");
    }
  };

  const onchange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
    <div className='text-center'><h1><u>Login To Your Account</u></h1></div>
      <div className=" m-4 container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              className="form-control"
              onChange={onchange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              className="form-control"
              onChange={onchange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/createuser" className="btn btn-danger mx-4">
            i'm a new user.
          </Link>
        </form>
      </div>
    </>
  )
}

export default Login
