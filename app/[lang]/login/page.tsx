"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "@/redux/app/hooks";
import { setCredentials } from "@/redux/features/local/auth/authSlice";
import { useDashboardLoginMutation } from "@/redux/features/api/auth/authNoTokenApiSlice";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/shared/CustomInput";
import logo from "@/public/images/logo.svg";
import loginImage from "@/public/images/LoginImage.png";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useTranslation } from "@/hooks/useTranslation";
import { toast } from "sonner";

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
  const { lang } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login, { isLoading, data, error, isSuccess }] =
    useDashboardLoginMutation();

  // Hydration state to prevent SSR/Client mismatch
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const userData = await login({
        password: values.password,
        email: values.email,
      }).unwrap();

      dispatch(
        setCredentials({
          ...userData?.data,
          email: values?.email,
        })
      );
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  useEffect(() => {
    if (isSuccess && !error) {
      toast.success(data?.msg || data?.data?.msg || "Login successful");
      router.push("/admin");
    }

    if (error && !isSuccess) {
      if ("status" in error) {
        const fetchError = error as FetchBaseQueryError;
        if (fetchError.data && typeof fetchError.data === "object") {
          const errorData = fetchError.data as any;
          if (Array.isArray(errorData.data) && errorData.data.length > 0) {
            errorData.data.forEach((err: any) => {
              toast.error(err);
            });
          } else {
            toast.error(errorData.msg || "Login error");
          }
        } else {
          toast.error("An error occurred during login");
        }
      }
    }
  }, [isSuccess, error, data, router]);

  // Prevent rendering on server
  if (!isClient) {
    return null;
  }

  return (
    <main
      className={`flex min-h-screen flex-col-reverse items-center justify-center gap-8 p-4 md:flex-row md:p-[80px] lg:container ${
        lang === "ar" ? "rtl text-right" : "ltr text-left"
      }`}
    >
      <section className="w-full max-w-[500px] flex-shrink-0">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched }) => (
            <Form className="w-full space-y-6 rounded-lg bg-white p-6 shadow-sm">
              <div className="flex justify-center">
                <Image
                  src={logo}
                  alt="logo"
                  width={100}
                  height={100}
                  className="h-16 w-auto md:h-20"
                />
              </div>
              <div className="space-y-2 text-start">
                <h1 className="text-xl font-[600] text-[#1B2559] md:text-3xl">
                  {lang === "ar"
                    ? "مرحبًا بك في Rehabco"
                    : "Welcome to Rehabco 👋🏻"}
                </h1>
                <p className="text-sm font-[500] text-[#68769F] md:text-[18px]">
                  {lang === "ar"
                    ? "يرجى تسجيل الدخول إلى حسابك"
                    : "Please sign-in to your account"}
                </p>
              </div>
              <div className="space-y-4">
                <CustomInput
                  type="email"
                  name="email"
                  placeholder={
                    lang === "ar" ? "البريد الإلكتروني" : "mail@mail.com"
                  }
                  title={lang === "ar" ? "البريد الإلكتروني" : "Email"}
                  error={
                    errors.email && touched.email ? errors.email : undefined
                  }
                />
                <CustomInput
                  type="password"
                  name="password"
                  placeholder={lang === "ar" ? "كلمة المرور" : "Password"}
                  title={lang === "ar" ? "كلمة المرور" : "Password"}
                  error={
                    errors.password && touched.password
                      ? errors.password
                      : undefined
                  }
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-secondaryColor rounded-[10px] text-white hover:bg-secondaryColor/80"
                size="lg"
              >
                {isLoading
                  ? lang === "ar"
                    ? "جارٍ التحميل..."
                    : "Loading..."
                  : lang === "ar"
                  ? "تسجيل الدخول"
                  : "Login"}
              </Button>
            </Form>
          )}
        </Formik>
      </section>
      <section className="w-full max-w-[500px] flex-shrink md:flex-shrink-0">
        <Image
          src={loginImage}
          alt={
            lang === "ar"
              ? "معاينة لوحة تحكم Rehabco"
              : "Rehabco Dashboard Preview"
          }
          width={500}
          height={250}
          className="h-auto w-full rounded-lg object-cover shadow-lg"
          priority
          placeholder="blur"
        />
      </section>
    </main>
  );
};

export default LoginPage;
