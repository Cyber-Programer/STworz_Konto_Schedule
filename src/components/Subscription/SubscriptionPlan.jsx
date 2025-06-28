import React from "react";
import WebIcons from "../../assets/images";

const SubscriptionPlan = () => {
  const subscriptionList = "flex items-center gap-5";
  return (
    // <div classN ame=" inset-0 bg-black/50 z-50 flex items-center justify-center">
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className=" bg-white p-10 shadow-lg rounded-xl flex flex-col items-center justify-center relative">
        <h1 className="text-2xl font-semibold capitalize mb-4">
          Subscription Plan
        </h1>
        <div className="flex gap-4 font-Roboto">
          {/* Free */}
          <div className="free flex flex-col gap-4    w-100 h-140 border-2 border-Primary p-10">
            <h2 className="font-bold text-2xl">Free</h2>
            <p className="text-gray-400">
              Ideal for individuals who need quick access to basic features.
            </p>

            <div>
              <span className="relative mt-5 amount w-full block text-5xl font-bold">
                $0{" "}
                <span className="absolute ml-3 text-sm text-gray-400 font-light bottom-0`">
                  /Month
                </span>
              </span>
              <button className="capitalize w-full border-2 rounded-sm mt-7 text-Primary border-Primary py-2">
                get started now
              </button>
              <ul className="flex flex-col gap-5 mt-10">
                <li className={subscriptionList}>
                  <img src={WebIcons.subscriptionIco} alt="subico" />
                  <p>
                    Access to AI-generated schedules is available for the first
                    3 days.
                  </p>
                </li>
                <li className={subscriptionList}>
                  <img src={WebIcons.subscriptionIco} alt="subico" />
                  <p>Can view the generated schedules</p>
                </li>
                <li className={subscriptionList}>
                  <img src={WebIcons.subscriptionIco} alt="subico" />
                  <p>
                    After 3 days, users need to upgrade to premium for continued
                    access.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          {/* Premium */}
          <div className="bg-[#3093FC] text-white p-10 rounded-lg max-w-[417px]">
            <h2 className="font-bold text-2xl">Premium</h2>
            <p className="text-gray-200 font-light w-80">
              Ideal for individuals who who need advanced features and tools for
              client work.
            </p>
            <span className="relative mt-5 amount w-full font-Maname  block text-5xl font-light">
              199 PLN zt
              <span className="absolute ml-3 text-sm text-white font-light bottom-0`">
                /Month
              </span>
            </span>
            <button className="capitalize w-full mt-15 py-3 rounded-sm text-blue-700  bg-white">
              get started nwo
            </button>
            <div>
              <ul className="flex flex-col gap-5 mt-10">
                <li className={subscriptionList}>
                  <img src={WebIcons.subscriptionIco} alt="" />
                  <p>
                    Admin can create as many schedules as needed, with no time
                    restrictions
                  </p>
                </li>
                <li className={subscriptionList}>
                  <img src={WebIcons.subscriptionIco} alt="" />
                  <p>Unlimited access to AI-powered schedule generation.</p>
                </li>
                <li className={subscriptionList}>
                  <img src={WebIcons.subscriptionIco} alt="" />
                  <p>
                    Premium users get priority customer support for issues and
                    inquiries.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <span className="text-[#3093FC] absolute top-5 right-10 cursor-pointer">
          skip
        </span>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
