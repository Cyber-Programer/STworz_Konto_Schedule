import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ForgotPassword = ({email,setEmail,onSubmit}) => {
  const { t } = useTranslation();
  // const [email, setEmail] = useState("");

  return (
    <div>
      <div className="max-w-md  mx-auto px-4 lg:px-0">
        <h1 className="text-[1.75rem] md:text-[2rem] font-medium text-textClr ">
          {t("auth.forgotPass")}
        </h1>
        <p className="text-[1.25rem] text-[#999999] leading-5 mt-3">
          {t("auth.forgotPassDesc")}
        </p>
        <form className="mt-6">
          {/* email input  */}
          <div>
            <label className="block mb-1 font-Inter font-medium text-textClr">
              {t("auth.yourEmail")}
            </label>
            <div className="form-control">
              <input
                type="email"
                value={email}
                placeholder={t("auth.placeholder.email")}
                className=" outline-none flex-1 text-gray-800"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            style={{
              cursor: email.trim() != "" ? "" : "not-allowed",
            }}
            className="submit_btn"
            disabled={!email.trim() != ""}
            onClick={onSubmit}
          >
            {t("auth.resetPass")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
