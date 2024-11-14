/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import PricingPage from "@/components/PricingPage";
import UserProfilePage from "@/components/UserProfilePage";
import Loader from "@/components/Loader"; // Import a Loader component
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserData } from "@/store/slices/userSlice";
import { setLocalStorage } from "@/utils";
import { usePathname } from "next/navigation";

const UserAreaContent = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Loading state
  const pathname = usePathname(); // Get the current pathname

  async function fetchData() {
    setLoading(true);
    await dispatch(getUserData())
      .unwrap()
      .then((res) => {
        setLocalStorage("userData", res?.data);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchData(); // Fetch data each time pathname changes
  }, [dispatch, pathname]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {userData?.data?.messageForNull || userData?.messageForNull ? (
        <PricingPage from={"preUser"} />
      ) : (
        <UserProfilePage loading={loading || false} />
      )}
    </>
  );
};

export default UserAreaContent;
