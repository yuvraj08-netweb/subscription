/* eslint-disable @next/next/no-img-element */
"use client";
import { logout } from "@/store/slices/userSlice";
import { clearLocalStorage } from "@/utils";
import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Navbar() {
  const pathname = usePathname();
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    await dispatch(logout())
      .unwrap()
      .then(() => {
        clearLocalStorage();
        toast.success("Logout Successful!")
        router.push("/login");
      });
  };

  return (
    <>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href="#" className="flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/256/5332/5332306.png"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                CompanyName
              </span>
            </Link>
            {userData === null ? (
              <div className="flex items-center lg:order-2">
                <Link
                  href="/login"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </Link>
                <Link
                  href="/sign-up"
                  className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-slate-600 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-slate-800"
                >
                  Get started
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2 lg:order-2">
                 {
                  pathname!=="/userArea" &&  <Link
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                  href="/userArea"
                >
                  User Area
                </Link>
                }
                {
                  userData?.data?.messageForNull || userData?.messageForNull ? null :   <Button
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                  onClick={()=>{
                    router.push("/pricing")
                  }}
                >
                  Pricing
                </Button>
                }
              
               
                <Button
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
               
                
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
