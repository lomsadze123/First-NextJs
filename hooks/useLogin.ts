import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const useLogin = () => {
  const router = useRouter();
  const [info, setInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

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

  return { handleInput, handleSubmit, info, error };
};

export default useLogin;
