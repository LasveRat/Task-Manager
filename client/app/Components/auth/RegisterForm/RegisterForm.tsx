"user client";
import React from "react";

function RegisterForm() {
  return (
    <form className="m-[2rem] px-10 py-14 rounded-lg bg-white w-full max-w-[520px]">
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-[1.35rem] font-medium">
          Register for an Account
        </h1>
        <p className="mb-8 px-[2rem] text-center text-[#999] text-[14px]">
          Create an account. Already have an account?{" "}
          <a
            href="/Login"
            className="font-bold text-[#29be67] hover:text-[#6255d6] transition-all duration-300"
          >
            Login here
          </a>
        </p>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-[#999]">
            Full name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            placeholder="John Doe"
          />
        </div>
        <div className="mt-[1rem] flex flex-col">
          <label htmlFor="email" className="mb-1 text-[#999]">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            placeholder="JohnDoe@gmail.com"
          />
        </div>
        <div className="relative mt-[1rem] flex flex-col">
          <label htmlFor="password" className="mb-1 text-[#999]">
            Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            placeholder="********************"
          />
          <button className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45">
            <i className="fas fa-eye"></i>
          </button>
        </div>
        <div className="mt-4 flex justify-end">
          <a
            href="/forgot-password"
            className="font-bold text-[#29be67] hover:text-[#6255d6] transition-all duration-300"
          >
            Forgot password?
          </a>
        </div>
        <div className="flex">
          <button
            type="submit"
            className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:bg-[#239251] transition-colors duration-400"
          >
            Register Now
          </button>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
