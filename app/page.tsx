import Link from "next/link";

const Home = async () => {
  return (
    <main className="flex flex-col items-center justify-center mt-40 md:mt-60">
      <h1 className="text-3xl md:text-5xl font-bold mb-12">
        Sign in or Register
      </h1>
      <div className="flex space-x-4 tet-1xl md:text-2xl">
        <Link
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          href="/register"
        >
          Register
        </Link>
        <Link
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          href="/login"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
};

export default Home;
