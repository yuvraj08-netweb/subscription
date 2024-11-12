/* eslint-disable @next/next/no-img-element */
import LoginForm from "@/components/LogInForm";
import Link from "next/link";
import React from "react";

const LoginPageContent = () => {
  return (
    <div className="flex justify-center align-center min-h-screen w-full">
      <div className="flex !w-full justify-center">
        <div className="container md:!w-[50%] !w-full md:px-20 px-12 flex flex-col py-5 justify-center items-center">
          <div className="formContianer max-w-xl md:w-full">
            <div className="formHeader">
              <img
                src="https://ilakkiasabap.wordpress.com/wp-content/uploads/2018/05/bsbr1t9a0resdcqo.png?w=621&h=221"
                alt="companyLogo"
                className="h-20 "
              />
              <h2 className="text-2xl leading-9 font-bold mt-8">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Not a member?
                <Link href="/sign-up" className="font-semibold text-indigo-700">
                  {" "}
                  Sign Up Here
                </Link>
              </p>
            </div>
            <div className="lowerContent mt-10">
              <div className="formDiv">
                <LoginForm/>
              </div>
            </div>
          </div>
        </div>
        <div className="container md:block hidden md:!w-[50%]">
          <img
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt="formImage"
            className="h-full  max-w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPageContent;
