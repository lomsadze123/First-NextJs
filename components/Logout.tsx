"use client";

import { signOut } from "next-auth/react";

const Logout = ({ username }: { username: string }) => {
  return (
    <>
      <span className="text-2xl ml-4 text-gray-800">Hello {username}</span>

      <button
        onClick={() => {
          signOut();
        }}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md mt-4 ml-4"
      >
        Logout
      </button>
    </>
  );
};

export default Logout;
