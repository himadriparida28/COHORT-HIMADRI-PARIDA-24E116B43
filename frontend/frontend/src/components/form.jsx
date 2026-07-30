import React, { useState } from "react";

function UserForm() {
  const [name, setName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !registrationNumber || !email || !password || !age) {
      setMessage("Please fill all the fields.");
      return;
    }

    setMessage("Registration Successful!");

    console.log({
      name,
      registrationNumber,
      email,
      password,
      age,
    });

    // Clear form
    setName("");
    setRegistrationNumber("");
    setEmail("");
    setPassword("");
    setAge("");
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
    </div>
  );
}

export default UserForm;