/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import PricingPage from "@/components/PricingPage";
import UserProfilePage from "@/components/UserProfilePage";
import Loader from "@/components/Loader"; // Import a Loader component
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserData } from "@/store/slices/userSlice";
import { setLocalStorage } from "@/utils";

const UserAreaContent = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Loading state

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
    // Check if the user is coming from Stripe
    if (sessionStorage.getItem("comingFromStripe")) {
      fetchData(); // Fetch data on return from Stripe
      sessionStorage.removeItem("comingFromStripe"); // Clear the flag
    }
    setLoading(false)
  }, [dispatch]);

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
