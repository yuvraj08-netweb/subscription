"use client";

import { useSelector } from "react-redux";
import CustomerInfoSection from "../ContactInfoSection";
import DataTable from "../DataTable";
import UserAreaSkeleton from "../UserAreaSkeleton";
import ProductDataTable from "../ProductDataTable";

export default function UserProfilePage({ loading }) {
  const { userData } = useSelector((state) => state.user);
  console.log(userData,"userData")
  if (loading) {
    return <UserAreaSkeleton />;
  }

  return (
    <>
      <div className="max-w-[90%] mx-auto min-h-[90vh]">
        <div className="w-full flex xl:flex-row flex-col justify-center gap-10">
          <div className="topSection">
            <CustomerInfoSection />
          </div>
          <div className="bottomSection mt-10">
            <DataTable data={userData?.data || userData} />
          </div>
        </div>
        <div className="my-10">
          
          <ProductDataTable data={userData?.data?.paymentHistory}/>
        </div>
      </div>
    </>
  );
}
