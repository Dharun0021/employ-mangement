'use client'; 

import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/Firebases";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginView, setIsLoginView] = useState(false);
  const [isMounted, setIsMounted] = useState(false); 

  useEffect(() => {
    setIsMounted(true); // Set to true after component has mounted
  }, []);

  // For registration
  const handleRegister = async () => {
    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful! Now you can log in.");
      setError(""); 
      setIsLoginView(true); 
    } catch (err: any) {
      setError(err.message); 
    } finally {
      setIsLoading(false);
    }
  };

  // For login
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      
      
      window.location.href = "/post"; 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        {isLoginView ? (
          // Login Form
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to your account with your email and password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button onClick={handleLogin} disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <p className="mt-2 pr-2">
                Don't have an account?{" "}
                <span className="text-blue-500 cursor-pointer" onClick={() => setIsLoginView(false)}>
                  Register
                </span>
              </p>
            </CardFooter>
          </Card>
        ) : (
          // Registration Form
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Create a new account by providing your details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button onClick={handleRegister} disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </Button>
              <p className="mt-2">
                Already registered?{" "}
                <span className="text-blue-500 cursor-pointer" onClick={() => setIsLoginView(true)}>
                  Login
                </span>
              </p>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}

export default AuthDemo;
