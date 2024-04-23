import getTodo from "@/_actions/getTodo";
import AddTodo from "@/components/AddTodo";

const Home = async () => {
  const { data, errMsg } = await getTodo();
  if (errMsg) return <h1>{errMsg}</h1>;

  return (
    <>
      <AddTodo data={data} />
    </>
  );
};

export default Home;
