export const getPhoneNumberWithDialCode = (selector = ".form-control") => {
  const inputValue =
    typeof document !== "undefined"
      ? document?.querySelector?.(selector)?.value ?? ""
      : "";

  let phoneInitialCode, typedPhoneNumber;

  let response = inputValue?.split?.(" ") || [];

  if (response.length > 0) {
    [phoneInitialCode, ...typedPhoneNumber] = response;
  }

  typedPhoneNumber = (typedPhoneNumber ?? [])
    ?.join?.("")
    ?.replace?.(/[^a-zA-Z0-9 ]/g, "");

  return {
    code: phoneInitialCode || "+91",
    phone: typedPhoneNumber,
  };
};
