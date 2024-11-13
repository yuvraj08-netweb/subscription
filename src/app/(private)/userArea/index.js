"use client";

import PricingPage from "@/components/PricingPage";
import UserProfilePage from "@/components/UserProfilePage";
import { useSelector } from "react-redux";

const UserAreaContent = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <>
      {userData?.data?.messageForNull ||  userData?.messageForNull ? <PricingPage from={"preUser"}/> : <UserProfilePage />}
    </>
  );
};

export default UserAreaContent;
