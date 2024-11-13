"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { Button, CircularProgress } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { getPhoneNumberWithDialCode } from "@/utils";
import { useDispatch } from "react-redux";
import { createUser } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const schema = yup.object().shape({
    fullName: yup.string().required("Please Provide Your Name"),
    emailId: yup
      .string()
      .required("Email is required !")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Email is Invalid"
      ),
    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Password must be at least 8 characters!")
      .matches(/[a-z]/, "At least one lowercase character!")
      .matches(/[A-Z]/, "At least one uppercase character!")
      .matches(/[\W_]/, "At least 1 special character (@, !, #, etc)!")
      .matches(/[0-9]/, "Must Include One Number"),
    confirmPassword: yup
      .string()
      .required("Password confirmation is required!")
      .oneOf([yup.ref("password"), null], "Passwords must match!"),
  });

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      emailId: "",
      contactNumber: "",
      password: "",
      confirmPassword: "",
    },
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const submitForm = async (data) => {

    const mobile = getPhoneNumberWithDialCode();
    const userData = {
        fullName: data.fullName,
        emailId: data.emailId,
        contactNumber: mobile.phone,
        countryCode: mobile.code,
        password:data.password,
    }

    try {
        await dispatch(createUser(userData))
        .unwrap()
        .then(()=>{
            router.push("/login");
            reset();
        })
    } catch (error) {
        console.error("User Creation Failed Due To : ",error)
    }
   
  };

  return (
    <form
      className="w-[90%] loginForm flex flex-col gap-5"
      onSubmit={handleSubmit(submitForm)}
    >
      <div className="formElement">
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => <input {...field} placeholder="Full Name" />}
        />
        <p className="errorPara">{errors.fullName?.message}</p>
      </div>
      <div className="formElement">
        <Controller
          name="emailId"
          control={control}
          render={({ field }) => <input {...field} placeholder="Email Id" />}
        />
        <p className="errorPara">{errors.emailId?.message}</p>
      </div>
      <div className="formElement">
        <Controller
          name="contactNumber"
          control={control}
          render={({ field }) => {
            return (
              <PhoneInput
                {...field}
                country={"in"}
                placeholder="00000-00000"
                enableSearch={true}
                value={field?.value}
                onChange={() => {
                  field.onChange();
                }}
                errorMessage={errors?.contactNumber?.message}
                inputStyle={{
                  padding: "5px 55px",
                  width: "100%",
                  border: "1px solid #535c91",
                }}
              />
            );
          }}
        />

        <p className="errorPara">{errors.contactNumber?.message}</p>
      </div>
      <div className="formElement relative">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                id="password"
              />
              <span
                className="absolute top-3 right-5 text-[#fff] cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </span>
            </>
          )}
        />
        <p className="errorPara">{errors.password?.message}</p>
      </div>
      <div className="formElement relative">
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                id="confirmPassword"
              />
              <span
                className="absolute top-3 right-5 text-[#fff] cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                <i
                  className={`fa ${
                    showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </span>
            </>
          )}
        />
        <p className="errorPara">{errors.confirmPassword?.message}</p>
      </div>

      <p className="text-[#949393d7] mb-4 sm:hidden block">
        Already have a account ?{" "}
        <Link href="/login">
          <span className="text-blue-700"> Login Here </span>
        </Link>{" "}
      </p>

      <div className="formElement max-w-[80px]">
        <Button
          variant="contained"
          color="success"
          type="submit"
          disabled={loading}
        >
          {loading ? <CircularProgress color="#000" /> : "Register"}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
