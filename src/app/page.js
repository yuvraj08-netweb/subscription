import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "CompanyName | Home",
  description: "",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <LandingPage />
    </>
  );
}
