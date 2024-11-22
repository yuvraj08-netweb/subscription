/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import PricingPage from "@/components/PricingPage";
import UserProfilePage from "@/components/UserProfilePage";
import Loader from "@/components/Loader"; // Import a Loader component
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserData } from "@/store/slices/userSlice";
import { getProductsList } from "@/store/slices/paymentSlice";

const UserAreaContent = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Loading state
  console.log(userData)
  async function fetchData() {
    setLoading(true);
    await dispatch(getUserData())
      .unwrap()
      .then(() => {
        dispatch(getProductsList()).unwrap().then(()=>{
          setLoading(false);
        })
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchData(); // Fetch data on return from Stripe
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
