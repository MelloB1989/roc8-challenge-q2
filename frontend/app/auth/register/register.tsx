"use client";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useAuthStore } from "@/app/states/auth";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    cPassword,
    setCPassword,
    register,
    loading,
    error,
    setLoading,
    signup,
  } = useAuthStore();
  useEffect(() => {
    if (error !== "") {
      toast.error(error);
    }
    if (signup) {
      toast.success("Sign up successful");
      window.location.href = "/auth/login";
    }
  }, [error, signup]);
  return (
    <>
      <ToastContainer />
      {/* component */}
      <link
        rel="stylesheet"
        href="https://horizon-ui.com/shadcn-nextjs-boilerplate/_next/static/css/32144b924e2aa5af.css"
      />
      <div className="flex flex-col justify-center items-center bg-white h-[100vh]">
        <div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] md:max-w-[50%] lg:h-[100vh] min-h-[100vh] lg:max-w-[50%] lg:px-6">
          <Link className="mt-10 w-fit text-zinc-950 dark:text-white" href="/">
            <div className="flex w-fit items-center lg:pl-0 lg:pt-0 xl:pt-0">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 320 512"
                className="mr-3 h-[13px] w-[8px] text-zinc-950 dark:text-white"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path>
              </svg>
              <p className="ml-0 text-sm text-zinc-950 dark:text-white">
                Back to the website
              </p>
            </div>
          </Link>
          <div className="my-auto mb-auto mt-8 flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px]">
            <p className="text-[32px] font-bold text-zinc-950 dark:text-white">
              Sign Up
            </p>
            <p className="mb-2.5 mt-2.5 font-normal text-zinc-950 dark:text-zinc-400">
              Enter your email, name and password to sign up!
            </p>
            <div className="relative my-4">
              <div className="relative flex items-center py-1">
                <div className="grow border-t border-zinc-200 dark:border-zinc-700" />
                <div className="grow border-t border-zinc-200 dark:border-zinc-700" />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <label
                      className="text-zinc-950 mt-2 dark:text-white"
                      htmlFor="password"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      placeholder="Name"
                      type="name"
                      autoComplete="name"
                      className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label
                      className="text-zinc-950 dark:text-white"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                      className="text-zinc-950 mt-2 dark:text-white"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      placeholder="Password"
                      type="password"
                      autoComplete="current-password"
                      className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      className="text-zinc-950 mt-2 dark:text-white"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="confirm-password"
                      placeholder="Confirm Password"
                      type="password"
                      autoComplete="confirm-password"
                      className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                      name="password"
                      value={cPassword}
                      onChange={(e) => setCPassword(e.target.value)}
                    />
                  </div>
                  <p style={{ color: "red" }}> {error} </p>
                  <button
                    className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
                    onClick={() => {
                      setLoading(true);
                      register();
                      if (signup) {
                        window.location.href = "/login";
                      }
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8V4a4 4 0 00-4 4H0a12 12 0 014-8z"
                        ></path>
                      </svg>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </div>
              <p>
                <Link
                  href="/auth/signup"
                  className="font-medium text-zinc-950 dark:text-white text-sm"
                >
                  Have an account? Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
