import React, { useState } from "react";
import Header from "../Components/Header";
import "../assets/animation.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // initialing the loader usestate
  const [load, setLoad] = useState(false);

  // Initializing nagivate
  const navigate = useNavigate();

  // initialize usestate to capture user entries
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // capturing user entries
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    // setErrors({...errors, email:'', password:''})
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const result = await axios.post("http://localhost:8000/api/login", {
        email: formdata.email,
        password: formdata.password,
      });
      console.log(result);
        if (result.status == 200) {
          setErrors({});
          alert(result.data.message);
          let user = result.data.user;
          let token = result.data.token;
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
          navigate(`/dashboard`);
        }
    } catch (error) {
      setErrors(error.response.data.errors);
      alert(error.response.data.message);
    } finally {
      setLoad(false);
    }
  };

  console.log(formdata);
  console.log(errors);

  return (
    <>
      <Header />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Flowbite
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                {/* Email address */}
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 dark:text-white ${
                      errors.email
                        ? "dark:focus:ring-red-500 dark:focus:border-red-500 focus:ring-red-600 focus:border-red-600 text-red-900 border-red-300 dark:bg-red-700 dark:border-red-600 "
                        : "dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-600 focus:border-blue-600 text-gray-900 border-gray-300 dark:bg-gray-700 dark:border-gray-600 "
                    }`}
                    placeholder="name@company.com"
                    required=""
                  />
                  <span className="text-red-600">{errors.email}</span>
                </div>

                {/* Password */}
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 dark:text-white ${
                      errors.password
                        ? "dark:focus:ring-red-500 dark:focus:border-red-500 focus:ring-red-600 focus:border-red-600 text-red-900 border-red-300 dark:bg-red-700 dark:border-red-600 "
                        : "dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-600 focus:border-blue-600 text-gray-900 border-gray-300 dark:bg-gray-700 dark:border-gray-600 "
                    }`}
                    required=""
                  />
                  <span className="text-red-600">{errors.password}</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {load ? (
                    <div>
                      <div className="loader"></div>
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Register here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
