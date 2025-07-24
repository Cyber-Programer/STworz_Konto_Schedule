import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import notify from "../../utils/tost";

const VerifyCode = ({ opt, setOpt, onSubmit }) => {
  const email = "demo@gmail.com";
  const { t } = useTranslation();
  const inputs = useRef([]);
  const [values, setValues] = useState(["", "", "", "", ""]);

  const handleSubmit = () => {
    
    setOpt = values.join("");
    notify.success('opt send')
    console.log(setOpt)
    onSubmit(setOpt);

  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      if (index < 4) {
        inputs.current[index + 1]?.focus();
      }
    } else {
      // If invalid, reset the value
      const newValues = [...values];
      newValues[index] = "";
      setValues(newValues);
    }
  };

  return (
    <div className="mx-auto max-w-md font-Roboto">
      <h3 className="text-[1.75rem] md:text-[2rem] font-medium">
        {t("auth.checkEmail")}
      </h3>
      <p className="text-gray-400">
        {t("auth.checkEmailDescLine1")} {email} {t("auth.checkEmailDescLine2")}
      </p>
      <div className="flex justify-between mt-5">
        {[...Array(5)].map((_, index) => (
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
