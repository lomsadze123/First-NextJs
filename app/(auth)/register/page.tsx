"use client";

import useRegister from "@/hooks/useRegister";

const Register = () => {
  const { handleInput, handleSubmit, info, error } = useRegister();

  return (
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter username"
          name="username"
          value={info.username}
          onChange={handleInput}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
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

export default Register;
