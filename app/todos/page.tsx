import AddTodo from "@/components/AddTodo";
import Logout from "@/components/Logout";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

const Todo = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      {!!session && <Logout username={session.user.username} />}
      {session ? (
        <AddTodo sessionId={session.user.id} />
      ) : (
        <div className="text-center text-3xl mt-10">
          <p className="mb-4">
            You are not logged in. You can get back to the home page
          </p>
          <Link className="text-blue-500 hover:underline" href="/">
            Click Here
          </Link>
        </div>
      )}
    </>
  );
};

export default Todo;
