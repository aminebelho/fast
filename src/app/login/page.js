// app/login/page.js
"use client"; // Ensure this directive is at the top

import { useState } from "react";
import axios from "../../lib/axios";
import { useRouter } from "next/navigation";

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

    setError(null); // Clear any previous errors

    try {
      const response = await axios.post("/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userEmail", email); // Store user email

      // Redirect on successful login without refreshing the page
      router.push("/"); // Navigate with Next.js router
    } catch (err) {
      console.error("Error:", err); // Log the error for debugging
      const errorMessage = err.response?.data?.message || "Une erreur s'est produite";
      setError(errorMessage); // Set the error message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
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
          <Button type="submit" onClick={handleLogin} className="w-full">
            Se connecter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
