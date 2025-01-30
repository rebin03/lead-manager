import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [user, setUser] = useState({ username: "", password: "" });

  const navgate = useNavigate()

  function handleSubmit(event){
    event.preventDefault()
    console.log(user)
    getTokenApi()
  }

  async function getTokenApi(){
    let response = await axios.post('http://127.0.0.1:8000/api/token/', user)
    if(response.status >= 200 && response.status < 300){

        let authToken = "Token " + response.data.token
        localStorage.setItem("token", authToken)
        navgate('/leadlist')
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <form action="" className="border border-2 rounded shadow p-4 mt-5" onSubmit={handleSubmit}>
              <h3 className="text-center fw-bold my-3">SignIn</h3>

              <div className="mb-3">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="form-control"
                  value={user.username}
                  onChange={(e) => setUser({...user, username: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="form-control"
                  value={user.password}
                  onChange={(e) => setUser({...user, password: e.target.value})}
                />
              </div>
              <div className="mb-3 text-center">
                <button className="btn btn-primary" type="submit">Login</button>
              </div>
            </form>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
