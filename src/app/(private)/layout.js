"use client";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader"; // Import your loader component
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "@/utils";

export default function Layout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const authToken = getLocalStorage("authToken");

    if (!authToken) {
      router.replace("/");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) return <Loader />;  

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
