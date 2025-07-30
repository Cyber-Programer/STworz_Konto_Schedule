
import React from "react";
import WebIcons from "../../assets/images";
import { useTranslation } from "react-i18next";

const CancelSubscription = () => {
  const { t } = useTranslation();
  return (
    <div className="p-6">
      <h2 className="text-[2rem] font-semibold text-textClr mb-8">
        {t("premiumPage.title")}
      </h2>

      <div className="border border-gray-300 rounded-md p-6 h-[80%] flex flex-col items-center  gap-6">
        <h3 className="text-4xl md:text-[2.5rem] font-bold capitalize text-center mb-4">
          {t("premiumPage.planTitle")}
        </h3>

        <div className="bg-Primary text-white rounded-xl shadow-lg p-6  max-w-[850px] h-auto md:h-[480px] mx-auto  mt-5 md:mt-16">
          <h4 className="font-bold text-xl sm:text-[1.375rem]">
            {t("premiumPage.premium")}
          </h4>
          <p className=" mb-4">{t("premiumPage.premiumDesc")}</p>

          <div className="text-center md:text-left text-4xl font-semibold mb-2">
            199{" "}
            <span className="text-xl font-normal">
              {t("cancel.priceLabel")}
            </span>
            <span className="text-sm font-light">
              {" "}
              {t("cancel.pricePerMonth")}{" "}
            </span>
          </div>

          <button className="w-full bg-white text-blue-500 font-semibold py-2 rounded-md mt-4 hover:bg-gray-100">
            {t("cancel.btn")}
          </button>

          <ul className="mt-6 space-y-3 ">
            <li className="flex items-start gap-2">
              <img src={WebIcons.subscriptionIco} alt="icons" />
              {t("cancel.list1")}
            </li>
            <li className="flex items-start gap-2">
              <img src={WebIcons.subscriptionIco} alt="icons" />
              {t("cancel.list2")}
            </li>
            <li className="flex items-start gap-2">
              <img src={WebIcons.subscriptionIco} alt="icons" />
              {t("cancel.list3")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CancelSubscription;
