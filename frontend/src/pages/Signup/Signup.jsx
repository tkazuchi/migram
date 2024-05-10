import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import validation from "../../utils/validators";
import FailureAlert from "../../components/FailureAlert";
import { useAuth } from "../../contexts/AuthContext";

export default function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const { token, login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!validation.validSignupBody(user)) {
        setErrorMessage("Missing Required Fields!");
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/v1/users/signup",
          user
        );

        localStorage.setItem("token", JSON.stringify(response.data.token));
        login(response.data.token);
        setErrorMessage(null);
        console.log("Sign Up Successful");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.error("Account Creation Failed! :", error.response.data.message);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="migram"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {errorMessage && <FailureAlert message={errorMessage} />}
          <form className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => {
                    setUser({ ...user, username: e.target.value });
                  }}
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex-1">
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => {
                      setUser({ ...user, firstName: e.target.value });
                    }}
                    id="firstname"
                    name="firstname"
                    type="firstname"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => {
                      setUser({ ...user, lastName: e.target.value });
                    }}
                    id="lastname"
                    name="lastname"
                    type="lastname"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          {token && (
            <Navigate to="/"/>
          )}
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Log in to your existing account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
