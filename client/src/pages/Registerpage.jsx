import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Registerpage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [cpassword, setCpassword] = useState("");
  async function register(ev) {
    ev.preventDefault(); //prevents reload
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration SuccessFull");
    } catch (error) {
      alert("Registration Failed");
    }
  }
  return (
    <div className="p-5 mt-4 grow flex items-center justify-around">
      <div className="-mt-64">
        <h1 className="text-4xl text-center  mb-4">Register</h1>
        <form className="mx-auto max-w-md" onSubmit={register}>
          <input
            type="text"
            placeholder="Dheeraj Sharma"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="abc@xyz.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          {/* <input type="password" placeholder="Confirm password" /> */}
          <button className="primary">Register</button>
          <div className="text-center p-2 text-gray-500">
            New here?
            <Link className="text-blue-300 underline" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
