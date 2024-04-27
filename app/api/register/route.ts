import connectDB from "@/config/database";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: any) => {
  try {
    await connectDB();
    const { username, email, password } = await req.json();
    const exist = await User.findOne({ $or: [{ email }, { password }] });
    if (exist) {
      return NextResponse.json(
        { message: "Username or email already exist" },
        { status: 500 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error register" }, { status: 500 });
  }
};
