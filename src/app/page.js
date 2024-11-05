// app/page.js
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");

    if (!token) {
      // If there's no token, redirect to the login page
      router.push('/login');
    } else {
      // If token exists, set the user email
      setUserEmail(email);
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-200">
      {userEmail ? (
        <>
          <h1 className="text-3xl font-bold">Bienvenue</h1>
          <p className="mt-4 text-lg">Bonjour, {userEmail}!</p>
        </>
      ) : (
        <p>Loading...</p> // Optional loading state
      )}
    </div>
  );
};

export default HomePage;
