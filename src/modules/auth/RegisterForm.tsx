"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { Input, Button, TextField, Label, FieldError } from "@heroui/react";
import toast from "react-hot-toast";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  role: "student" | "instructor";
}

export default function RegisterForm() {
  const router = useRouter();
  const { register: registerUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      role: "student",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);

      await registerUser(
        data.name,
        data.email,
        data.password,
        data.role
      );

      toast.success("Registration Successful");

      router.push("/dashboard");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-6 text-center text-3xl font-bold">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <TextField className="flex flex-col gap-2">
            <Label className="text-sm font-semibold">Full Name</Label>
            <Input
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <FieldError className="text-sm text-rose-500">
                {errors.name.message}
              </FieldError>
            )}
          </TextField>

          <TextField className="flex flex-col gap-2">
            <Label className="text-sm font-semibold">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <FieldError className="text-sm text-rose-500">
                {errors.email.message}
              </FieldError>
            )}
          </TextField>

          <TextField className="flex flex-col gap-2">
            <Label className="text-sm font-semibold">Password</Label>
            <Input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <FieldError className="text-sm text-rose-500">
                {errors.password.message}
              </FieldError>
            )}
          </TextField>

          <TextField className="flex flex-col gap-2">
            <Label className="text-sm font-semibold">Role</Label>
            <select
              className="w-full rounded-xl border border-default-200 bg-default-50 px-4 py-3 text-sm text-foreground outline-none transition duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              {...register("role")}
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </TextField>

          <Button
            type="submit"
            className="w-full rounded-xl py-3 text-sm font-semibold"
            isDisabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}