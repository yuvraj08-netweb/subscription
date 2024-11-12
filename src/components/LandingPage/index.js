"use client";
import { Button, Divider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleLoginRoute = () => {
    router.push("/login");
  };

  const handleSignUpRoute = () => {
    router.push("/sign-up");
  };

  return (
    <div className="w-full min-h-[100vh] bg-slate-800 flex gap-5 flex-col items-center justify-center text-gray-200">
      <div className="header">
        <Typography variant="h3" component="h2">
          Choose An Action To Perform!!!
        </Typography>
      </div>
      <div className="w-[90%] h-[200px] bg-slate-500 mt-10">
        <div className="btnsContainer flex justify-center items-center h-full gap-5">
          <div className="login-btn w-full text-center">
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                handleLoginRoute();
              }}
            >
              Login
            </Button>
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="sign-up-btn w-full  text-center">
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                handleSignUpRoute();
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
