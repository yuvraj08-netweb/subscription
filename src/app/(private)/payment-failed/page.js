import PaymentFailed from ".";

export const metadata = {
  title: "CompanyName | Payment Failed",
  description: "",
};

const FailedPage = () => {
  return (
    <div className="!w-full !min-h-screen flex justify-center items-center">
      <PaymentFailed />
    </div>
  );
};

export default FailedPage;
