import React, { useState } from "react";
import Header from "../Components/Header";
import "../assets/animation.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // initialing the loader usestate
  const [load, setLoad] = useState(false);

  // Initializing nagivate
  const navigate = useNavigate();

  // initialize usestate to capture user entries
  const [formdata, setFormdata] = useState({
    firstname: "",
    middlename: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    gender: "",
    user_role: "",
  });

  // // initialize usestate to capture errors
  // const [errors, setErrors] = useState({
  //   firstname: "",
  //   middlename: "",
  //   surname: "",
  //   email: "",
  //   phone: "",
  //   password: "",
  //   confirm: "",
  //   gender: "",
  //   user_role: "",

  // });
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
    try {
      const result = await axios.post("http://localhost:8000/api/register", {
        firstname: formdata.firstname,
        middlename: formdata.middlename,
        surname: formdata.surname,
        email: formdata.email,
        password: formdata.password,
        confirm: formdata.confirm,
        phone: formdata.phone,
        gender: formdata.gender,
        user_role: formdata.user_role,
      });
      console.log(result);
      // console.log(result.response.data);
      if (result.status == 201) {
        setErrors({});
        alert(result.data.message);
        navigate(`/verify?email=${formdata.email}`)

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
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                {/* Firstname */}
                <div>
                  {/* <div className="loader"></div> */}
                  <label
                    for="firstname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your firstname
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    onChange={handleChange}
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 dark:text-white ${
                      errors.firstname
                        ? "dark:focus:ring-red-500 dark:focus:border-red-500 focus:ring-red-600 focus:border-red-600 text-red-900 border-red-300 dark:bg-red-700 dark:border-red-600 "
                        : "dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-600 focus:border-blue-600 text-gray-900 border-gray-300 dark:bg-gray-700 dark:border-gray-600 "
                    }`}
                    placeholder="John"
                    required=""
                  />
                  <span className="text-red-600">{errors.firstname}</span>
                </div>

                {/* Middlename */}
                <div>
                  <label
                    for="middlename"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your middlename
                  </label>
                  <input
                    type="text"
                    name="middlename"
                    id="middlename"
                    onChange={handleChange}
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 dark:text-white ${
                      errors.middlename
                        ? "dark:focus:ring-red-500 dark:focus:border-red-500 focus:ring-red-600 focus:border-red-600 text-red-900 border-red-300 dark:bg-red-700 dark:border-red-600 "
                        : "dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-600 focus:border-blue-600 text-gray-900 border-gray-300 dark:bg-gray-700 dark:border-gray-600 "
                    }`}
                    placeholder="Smith (Optional)"
                  />
                  <span className="text-red-600">{errors.middlename}</span>
                </div>

                {/* Surname */}
                <div>
                  <label
                    for="surname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your surname
                  </label>
                  <input
                    type="text"
                    name="surname"
                    id="surname"
                    onChange={handleChange}
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 dark:text-white ${
                      errors.surname
                        ? "dark:focus:ring-red-500 dark:focus:border-red-500 focus:ring-red-600 focus:border-red-600 text-red-900 border-red-300 dark:bg-red-700 dark:border-red-600 "
                        : "dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-600 focus:border-blue-600 text-gray-900 border-gray-300 dark:bg-gray-700 dark:border-gray-600 "
                    }`}
                    placeholder="Doe"
                    required=""
                  />
                  <span className="text-red-600">{errors.surname}</span>
                </div>

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

                {/* Confirm Password */}
                <div>
                  <label
                    for="confirm"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm"
                    id="confirm"
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 dark:text-white ${
                      errors.confirm
                        ? "dark:focus:ring-red-500 dark:focus:border-red-500 focus:ring-red-600 focus:border-red-600 text-red-900 border-red-300 dark:bg-red-700 dark:border-red-600 "
                        : "dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-600 focus:border-blue-600 text-gray-900 border-gray-300 dark:bg-gray-700 dark:border-gray-600 "
                    }`}
                    required=""
                  />
                  <span className="text-red-600">{errors.confirm}</span>
                </div>

                {/* Phone */}
                <div>
                  <label
                    for="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    onChange={handleChange}
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 dark:text-white ${
                      errors.phone
                        ? "dark:focus:ring-red-500 dark:focus:border-red-500 focus:ring-red-600 focus:border-red-600 text-red-900 border-red-300 dark:bg-red-700 dark:border-red-600 "
                        : "dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-600 focus:border-blue-600 text-gray-900 border-gray-300 dark:bg-gray-700 dark:border-gray-600 "
                    }`}
                    placeholder="John"
                    required=""
                  />
                  <span className="text-red-600">{errors.phone}</span>
                </div>

                {/* Gender */}
                <div>
                  <label
                    for="gender"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                    Select Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    onChange={handleChange}
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 dark:text-white ${
                      errors.gender
                        ? "dark:focus:ring-red-500 dark:focus:border-red-500 focus:ring-red-600 focus:border-red-600 text-red-900 border-red-300 dark:bg-red-700 dark:border-red-600 "
                        : "dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-600 focus:border-blue-600 text-gray-900 border-gray-300 dark:bg-gray-700 dark:border-gray-600 "
                    }`}
                  >
                    <option selected>Choose a gender</option>
                    <option value="Male">Okunrin</option>
                    <option value="Female">Obirin</option>
                    <option value="Others">Mayowa</option>
                  </select>
                  <span className="text-red-600">{errors.gender}</span>
                </div>

                {/* Role */}
                <div>
                  <label
                    for="user_role"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                    Select Role
                  </label>
                  <select
                    id="user_role"
                    name="user_role"
                    onChange={handleChange}
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 dark:text-white ${
                      errors.user_role
                        ? "dark:focus:ring-red-500 dark:focus:border-red-500 focus:ring-red-600 focus:border-red-600 text-red-900 border-red-300 dark:bg-red-700 dark:border-red-600 "
                        : "dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-600 focus:border-blue-600 text-gray-900 border-gray-300 dark:bg-gray-700 dark:border-gray-600 "
                    }`}
                  >
                    <option selected>Choose a role</option>
                    <option value="user">User</option>
                    <option value="vendor">Vendor</option>
                  </select>
                  <span className="text-red-600">{errors.user_role}</span>
                </div>

                {/* Term & Condition */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {load ? <div><div className="loader"></div></div> : "Create an account"}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Login here
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
