import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import notify from "../../utils/tost";

const VerifyCode = ({ otp, setOtp, onSubmit }) => {
  const email = "demo@gmail.com";
  const { t } = useTranslation();
  const inputs = useRef([]);
  const [values, setValues] = useState(["", "", "", "", "", ""]);

  const handleSubmit = () => {
    const joinOtp = values.join(""); // join the otp array in a single string..
    setOtp(joinOtp);
    onSubmit(joinOtp);
  };

  // change
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      // validate the otp (only number)
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      if (index < 5) {
        inputs.current[index + 1]?.focus();
      }
    } else {
      // If invalid, reset the value
      const newValues = [...values];
      newValues[index] = "";
      setValues(newValues);
    }
  };

  // backSpace
  const handleKey = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // prevent default browser behavior

      const newValues = [...values];

      if (values[index]) {
        // If current field has a value, clear it
        newValues[index] = "";
        setValues(newValues);
      } else if (index > 0) {
        // If empty, move focus left and clear previous value
        newValues[index - 1] = "";
        setValues(newValues);
        inputs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  // Paste
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim();
    if (!paste) return;

    // Filter only digits and slice max 6 chars
    const digits = paste.replace(/\D/g, "").slice(0, 6).split("");

    if (digits.length === 0) return;

    const newValues = [...values];
    for (let i = 0; i < digits.length; i++) {
      newValues[i] = digits[i];
    }
    setValues(newValues);

    // Focus the last filled input
    const lastFilledIndex = digits.length - 1;
    inputs.current[lastFilledIndex]?.focus();
  };

  return (
    <div className="mx-auto max-w-md px-4 font-Roboto">
      <h3 className="text-[1.75rem] md:text-[2rem] font-medium">
        {t("auth.checkEmail")}
      </h3>
      <p className="text-gray-400">
        {t("auth.checkEmailDescLine1")} <strong>{email}</strong>{" "}
        {t("auth.checkEmailDescLine2")}
      </p>

      <div className="flex justify-between mt-5">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            maxLength={1}
            type="tel"
            inputMode="numeric"
            value={values[index]} // controlled input
            className={`p-2 rounded-lg border-2 text-center outline-none text-xl w-[3rem] h-[4rem] transition-colors duration-150 ${
              values[index] ? "border-blue-500" : "border-gray-400"
            }`}
            ref={(el) => (inputs.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => {
              handleKey(e, index);
            }}
            onPaste={handlePaste}
          />
        ))}
      </div>
      <button
        className="submit_btn bg-Primary text-white rounded-2xl w-full max-h-30 mt-4"
        disabled={!values.every((e) => e.trim() != "")}
        onClick={handleSubmit}
        style={{
          cursor: values.every((e) => e.trim() != "")
            ? "pointer"
            : "not-allowed",
        }}
      >
        {t("auth.verifyCode")}
      </button>
      <p className="text-gray-400 text-base mt-5">
        {t("auth.haventGotEmail")}{" "}
        <span className="text-Primary underline cursor-pointer">
          {t("auth.resentEmail")}
        </span>
      </p>
    </div>
  );
};

export default VerifyCode;
