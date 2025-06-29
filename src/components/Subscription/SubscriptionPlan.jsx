import React from "react";
import WebIcons from "../../assets/images";

const SubscriptionPlan = () => {
  const subscriptionList = "flex items-start gap-3";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white p-6 sm:p-10 shadow-lg rounded-xl w-full max-w-4xl relative">
        <h1 className="text-2xl sm:text-4xl font-bold capitalize text-center mb-10">
          Subscription Plan
        </h1>

        <div className="flex flex-col md:flex-row gap-6 font-Roboto justify-center items-stretch">
          {/* Free Plan */}
          <div className="border border-[#AAAAAA] rounded-md p-6 flex flex-col justify-between w-full md:w-1/2">
            <h2 className="font-bold text-xl sm:text-2xl text-[#191D23]">Free</h2>
            <p className="text-[#64748B] text-sm mt-2">
              Ideal for individuals who need quick access to basic features.
            </p>

            <div className="mt-4">
              <span className="relative block text-4xl font-bold text-[#191D23]">
                $0
                <span className="absolute text-sm ml-2 text-[#4B5768] bottom-3">
                  / Month
                </span>
              </span>

              <button className="capitalize w-full border border-blue-600 text-blue-600 font-semibold rounded mt-6 py-2 text-sm">
                Get started now
              </button>

              <ul className="flex flex-col gap-4 mt-6 text-sm">
                <li className={subscriptionList}>
                  <img src={WebIcons.subscriptionIco} alt="subico" />
                  <p>
                    Access to AI-generated schedules is available for the first 3 days.
                  </p>
                </li>
                <li className={subscriptionList}>
                  <img src={WebIcons.subscriptionIco} alt="subico" />
                  <p>Can view the generated schedules</p>
                </li>
                <li className={subscriptionList}>
                  <img src={WebIcons.subscriptionIco} alt="subico" />
                  <p>
                    After 3 days, users need to upgrade to premium for continued access.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-blue-600 text-white rounded-md p-6 flex flex-col justify-between w-full md:w-1/2">
            <h2 className="font-bold text-xl sm:text-2xl">Premium</h2>
            <p className="text-gray-200 font-light mt-2 text-sm">
              Ideal for individuals who need advanced features and tools for client work.
            </p>

            <span className="relative mt-4 block text-4xl font-bold">
              199 PLN
              <span className="absolute ml-2 text-sm text-white bottom-3">/ Month</span>
            </span>

            <button className="capitalize w-full mt-6 py-2 rounded bg-white text-blue-700 font-semibold text-sm">
              Get started now
            </button>

            <ul className="flex flex-col gap-4 mt-6 text-sm">
              <li className={subscriptionList}>
                <img src={WebIcons.subscriptionIco} alt="" />
                <p>
                  Admin can create as many schedules as needed, with no time restrictions
                </p>
              </li>
              <li className={subscriptionList}>
                <img src={WebIcons.subscriptionIco} alt="" />
                <p>Unlimited access to AI-powered schedule generation.</p>
              </li>
              <li className={subscriptionList}>
                <img src={WebIcons.subscriptionIco} alt="" />
                <p>
                  Premium users get priority customer support for issues and inquiries.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <span className="text-blue-600 absolute top-4 right-6 cursor-pointer text-sm">
          Skip
        </span>
      </div>
    </div>
  );
};

export default SubscriptionPlan;

