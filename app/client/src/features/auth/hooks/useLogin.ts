import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

import { apiRequest, type ApiEnvelope } from "@/lib/api";

type TokenResponse = {
  access_token: string;
  token_type: string;
};

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginSchemaType) => {
    try {
      setIsPending(true);
      const response = await apiRequest<ApiEnvelope<TokenResponse>>(
        "/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );

      if (!response.data) {
        throw new Error("Missing token in login response");
      }

      const token = response.data;
      localStorage.setItem("auth_token", token.access_token);
      toast.success("Login successful");
      window.location.href = "/dashboard";
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Login failed";
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  };

  return {
    form,
    isPending,
    handleSubmit: handleLogin,
  };
};