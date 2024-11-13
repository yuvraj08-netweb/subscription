"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, CircularProgress } from "@mui/material";
import { getUserData, signInUser } from "@/store/slices/userSlice";
import { setLocalStorage } from "@/utils";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const schema = yup.object().shape({
    emailId: yup
      .string()
      .required("Email is required !")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Email is Invalid"
      ),
    password: yup.string().required("Please Enter Password"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      emailId: "", // Default value for fullName
      password: "",
    },
  });

  const navigate = useRouter();
  const dispatch = useDispatch();

  const submitForm = async (data) => {
    setLoading(true);
    try {
      await dispatch(signInUser(data))
        .unwrap()
        .then(async (res) => {
          setLocalStorage("authToken", res?.data?.token);
          await dispatch(getUserData(res?.data?.token))
            .unwrap()
            .then((res) => {
              setLocalStorage("userData", res?.data);
              navigate.push("/userArea");
              toast.success("Login Successful !");
            });
          setLoading(false);
        });
    } catch (error) {
      toast.error("Login Failed !");
      console.error(error, "ERROR");
    }
  };

  return (
    <form
      className="md:max-w-[350px] max-w-[85%] loginForm flex flex-col gap-5"
      onSubmit={handleSubmit(submitForm)}
    >
      <div className="formElement">
        <Controller
          name="emailId"
          control={control}
          render={({ field }) => <input {...field} placeholder="Email Id" />}
        />
        <p className="errorPara">{errors.emailId?.message}</p>
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
      <div className="formElement">
        <Button variant="contained" type="submit">
          {
            loading ? <CircularProgress color="#fff" /> : "Log In"
          }
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
