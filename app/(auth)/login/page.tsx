"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const Login = () => {
  const router = useRouter();
  const [info, setInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Define the schema for validation
  const schema = z.object({
    email: z.string().email("Invalid email format").min(1),
    password: z.string().min(1),
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Validate the input data
      const validationResult = schema.safeParse(info);
      if (validationResult.success === false) {
        setError(validationResult.error.errors[0].message);
        return;
      }

      // If validation passes, proceed with sign-in
      const res = await signIn("credentials", {
        email: info.email,
        password: info.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials");
        return;
      }
      router.replace("/todos");
    } catch (error) {
      setError(
        error instanceof z.ZodError
          ? error.errors[0].message
          : "An error occurred"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto mt-8">
      <h1 className="text-2xl text-center text-blue-500 mb-8">
        Login to enter your note app
      </h1>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          value={info.email}
          onChange={handleInput}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={info.password}
          onChange={handleInput}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
};

export default Login;
