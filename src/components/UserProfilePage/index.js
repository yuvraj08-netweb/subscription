"use client";

import { useSelector } from "react-redux";
import CustomerInfoSection from "../ContactInfoSection";
import DataTable from "../DataTable";
import PricingPage from "../PricingPage";

export default function UserProfilePage() {
  const { userData } = useSelector((state) => state.user);

  return (
    <>
    <div className="max-w-[90%] mx-auto min-h-[90vh] flex xl:flex-row flex-col  justify-center gap-10">
      <div className="topSection">
        <CustomerInfoSection />
      </div>
      <div className="bottomSection mt-10">
        <DataTable data={userData?.data || userData} />
      </div>
    </div>
    <div>
        <PricingPage from={"postUser"}/>
      </div>
    </>
  );
}
