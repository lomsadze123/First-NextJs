import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const useRegister = () => {
  const [info, setInfo] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const schema = z.object({
    username: z.string().min(1),
    email: z.string().email("Invalid email format").min(1),
    password: z.string().min(1),
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validationResult = schema.safeParse(info);
      if (validationResult.success === false) {
        setError(validationResult.error.errors[0].message);
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      if (res.ok) {
        setInfo({ username: "", email: "", password: "" });
        setError("");
        router.replace("/login");
        router.refresh();
      } else {
        setError("Something went wrong");
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  return { handleInput, handleSubmit, info, error };
};

export default useRegister;
