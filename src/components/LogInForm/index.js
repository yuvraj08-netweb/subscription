"use client"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@mui/material";
import { signInUser } from "@/store/slices/userSlice";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  
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
    console.log(data,"data");
    
    try {
        await dispatch(signInUser(data)).unwrap().then((res)=>{
          console.log(res?.data?.data,"res");
          localStorage.setItem("userCredentials", JSON.stringify(res?.data?.data))
          navigate.push("/userArea");
        })
    } catch (error) {
      console.error(error,"ERROR")
    }
    // try {
    //     await signInWithEmailAndPassword(auth, data.emailId, data.password).then(
    //     () => {
    //       dispatch(fetchUserData()).unwrap().then(async ()=> {
    //         if(Notification.permission === "granted"){
    //           generateToken();
    //         }
    //       })
    //       reset();
    //       navigate("/userArea");
    //     }
    //   );
    // } catch (error) {
    //   toast.error(`Log In Failed Due To : ${error.message}`);
    // }
  };

  return (
    <form className="md:max-w-[350px] max-w-[85%] loginForm flex flex-col gap-5" onSubmit={handleSubmit(submitForm)}>
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
        <Button
            variant="contained"
            type="submit"
        >
            Log In
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
