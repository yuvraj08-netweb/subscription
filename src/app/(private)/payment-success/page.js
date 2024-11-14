import PaymentStatus from ".";

export const metadata = {
  title: "CompanyName | Payment Successfull",
  description: "",
};

const SuccessPage = () => {
  return (
    <div className="!w-full !min-h-screen flex justify-center items-center">
      <PaymentStatus />
    </div>
  );
};

export default SuccessPage;
