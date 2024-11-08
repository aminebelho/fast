"use client"; // Ensure this directive is at the top

import { useState } from "react";
import axios from "../../lib/axios";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

// Importing UI components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    setError(null);
  
    try {
      // Sending login request
      const response = await axios.post("/login", { email, password });
      const token = response.data.token;
  
      // Check if token is present and valid
      if (token) {
        // Save token in cookies
        Cookies.set("token", token, { expires: 1 }); // Expires in 1 day
        Cookies.set("userEmail", email, { expires: 1 }); // Optionally store email

        // Log the token and email immediately after setting
        console.log("Token saved in cookies:", Cookies.get("token"));
        console.log("Email saved in cookies:", Cookies.get("userEmail"));
  
        // Check if token is set correctly in localStorage
        localStorage.setItem("token", token); // Store token in localStorage as well
        localStorage.setItem("userEmail", email); // Optionally store email in localStorage
        console.log("Token saved in localStorage:", localStorage.getItem("token"));
        console.log("Email saved in localStorage:", localStorage.getItem("userEmail"));

        // Redirect to homepage after successful login
        router.push("/");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#d1fae5]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>Connectez-vous à votre compte</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
              />
            </div>
            {error && <p className="text-red-600 mt-4">{error}</p>}
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button type="submit" onClick={handleLogin} className="w-full bg-[#059669]">
            Se connecter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
