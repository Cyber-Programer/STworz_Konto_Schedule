import React from "react";
import WebIcons from "../../assets/images";

const CanselSubscription = () => {
  return (
    <div className="p-6">
      <h2 className="text-[2rem] font-semibold text-textClr mb-8">For Premium user</h2>

      <div className="border border-gray-300 rounded-md p-6 h-[795px] flex flex-col items-center  gap-6">
        <h3 className="text-2xl sm:text-4xl font-bold capitalize text-center mb-8">
          Subscription Plan
        </h3>

        <div className="bg-Primary text-white rounded-xl shadow-lg p-6 max-w-[850px] h-[480px] mx-auto mt-16">
          <h4 className="font-bold text-xl sm:text-2xl">Premium</h4>
          <p className=" mb-4">
            Ideal for individuals who who need advanced features and tools for
            client work.
          </p>

          <div className="text-4xl font-semibold mb-2">
            199 <span className="text-xl font-normal">PLN zt</span>
            <span className="text-sm font-light"> / Month</span>
          </div>

          <button className="w-full bg-white text-blue-500 font-semibold py-2 rounded-md mt-4 hover:bg-gray-100">
            Cancel Now
          </button>

          <ul className="mt-6 space-y-3 ">
            <li className="flex items-start gap-2">
              <img src={WebIcons.subscriptionIco} alt="icons" />
              Admin can create as many schedules as needed, with no time
              restrictions
            </li>
            <li className="flex items-start gap-2">
              <img src={WebIcons.subscriptionIco} alt="icons" />
              Unlimited access to AI-powered schedule generation.
            </li>
            <li className="flex items-start gap-2">
              <img src={WebIcons.subscriptionIco} alt="icons" />
              Premium users get priority customer support for issues and
              inquiries.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CanselSubscription;
