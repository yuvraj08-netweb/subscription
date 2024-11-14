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

  useEffect(() => {
    async function fetchData() {
      // setLoading(true);
      await dispatch(getUserData())
        .unwrap()
        .then((res) => {
          setLocalStorage("userData", res?.data);
        })
        .finally(() => setLoading(false)); // Set loading to false once done
    }
    fetchData();
  }, [dispatch]);

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {userData?.data?.messageForNull || userData?.messageForNull ? (
        <PricingPage from={"preUser"} />
      ) : (
        <UserProfilePage loading={loading || false}/>
      )}
    </>
  );
};

export default UserAreaContent;
