// app/login/page.js
"use client"; // Add this directive at the top

import { useState } from "react";
import axios from "../../lib/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("/login", { email, password });
        console.log('Response:', response); // Log the response
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", email); // Store user email as well
        window.location.href = "/";
    } catch (err) {
        console.error('Error:', err); // Log the error
        setError(err.response?.data?.message || "Une erreur s'est produite");
    }
};


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="h-1/2 bg-white w-1/4">
        <div className="h-1/5">
          <h1 className="text-3xl font-bold p-6 text-center">Connexion</h1>
        </div>
        <div className="h-4/5">
          <form onSubmit={handleLogin} className="w-full max-w-md p-3 h-full">
            <div className="h-1/3 p-2 ">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="h-1/3 p-2">
              <label className="block mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            {error && <p className="text-red-600 mt-4">{error}</p>}
            <div className="h-1/3 p-2 flex justify-center items-center">
            <button
              type="submit"
              className="w-fit h-fit p-3 bg-blue-600 text-white rounded"
            >
              Se connecter
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
