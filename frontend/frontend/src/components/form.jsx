import React, { useState } from "react";
import axios from "axios";
function UserForm() {
  const [name, setName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [page, setPage] = useState("welcome");

 const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !registrationNumber || !email || !password || !age) {
      setMessage("Please fill all the fields.");
      return;
    }

    try {
      const response = await axios.post("/api/user", {
        username: name,
        registration_no: registrationNumber,
        email: email,
        password: password,
        age: parseInt(age),
      });

      console.log("User created:", response.data);
      setMessage("Registration Successful!");
      setName("");
      setRegistrationNumber("");
      setEmail("");
      setPassword("");
      setAge("");

    } catch (error) {
      console.error(error);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <div>
        <h2>
          Registration Form
        </h2>

        <form onSubmit={handleSubmit} >

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
          />

          <input
            type="text"
            placeholder="Registration Number"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
          />

          <input
            type="number"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
          />

          {message && (
            <div className="bg-green-700 text-white p-3 rounded-lg">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
          >
            Register
          </button>

        </form>
      </div>
      <div>
    {page === "welcome" && (
      <div>
        <h1>Welcome!</h1>
        <button onClick={() => setPage("login")}>Login</button>
        <button onClick={() => setPage("register")}>Register</button>
      </div>
    )}

    {page === "register" && (
      <div>
        {/* your existing registration form goes here */}
      </div>
    )}

    {page === "login" && (
      <div>
        {/* login form goes here */}
        {/* on success → setUser(response.data) then setPage("profile") */}
      </div>
    )}

    {page === "profile" && (
      <div>
        <h2>Welcome, {user?.username}</h2>
        <p>Email: {user?.email}</p>
        <p>Age: {user?.age}</p>
        <button onClick={() => setPage("welcome")}>Logout</button>
      </div>
    )}
  </div>
    </div>
    
  );
}

export default UserForm;