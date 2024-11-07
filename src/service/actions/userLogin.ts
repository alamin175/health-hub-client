"use server";

import { FormValues } from "@/app/(withCommonLayout)/login/page";
import { headers } from "next/headers";

export const userLogin = async (value: FormValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
    cache: "no-store",
  });
  const userInfo = await res.json();
  return userInfo;
};
