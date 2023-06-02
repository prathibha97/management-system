/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/api";

function ResetPassword({ setPage }) {

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

  const { email } = useSelector((state) => state.password);

  async function handlePasswordChange() {
    try {
      await api.post('/emp/auth/reset-password', { email, password: newPassword })
      setConfirmPassword("");
      setNewPassword("");
      setPage("login");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <section className="bg-gray-50 w-screen dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form onSubmit={handlePasswordChange} className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#1DB3AB] focus:border-[#1DB3AB] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#1DB3AB] dark:focus:border-[#1DB3AB]"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#1DB3AB] focus:border-[#1DB3AB] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#1DB3AB] dark:focus:border-[#1DB3AB]"
                  required=""
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-[#1DB3AB] dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="newsletter"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-[#1DB3AB] hover:underline dark:text-primary-500"
                      href="/"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
            </form>
            <button
              onClick={() => handlePasswordChange()}
              type='button'
              className="w-full mt-5 text-white bg-[#1DB3AB] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#1DB3AB] dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset passwod
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResetPassword;
