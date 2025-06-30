import React, { useState } from "react";
import WebIcons from "../../assets/images";

const Premium = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [premium] = useState({
    monthly: {
      timeLine: " monthly",
      desc: "Ideal for individuals who who need advanced features and tools for client work.",
      price: "199 PLN zt",
      opt: [
        "Admin can create as many schedules as needed, with no time restrictions",
        "Unlimited access to AI-powered schedule generation.",
        "Premium users get priority customer support for issues and inquiries. ",
      ],
    },
    yearly: {
      timeLine: " yearly",
      desc: "Ideal for individuals who who need advanced features and tools for client work.",
      price: "1499 PLN zt",
      opt: [
        "Admin can create as many schedules as needed, with no time restrictions",
        "Unlimited access to AI-powered schedule generation.",
        "Premium users get priority customer support for issues and inquiries. ",
      ],
    },
  });

  const handleToggle = () => {
    setIsYearly(!isYearly);
  };
  const subscriptionList = "flex items-center gap-5";

  return (
    <div className="capitalize font-Roboto mt-5">
      <h1 className="text-[2rem] font-semibold text-textClr">
        for premium user
      </h1>
      <div className="m-5 p-10 border border-gray-400 flex flex-col gap-3 items-center justify-center">
        <h1 className="text-2xl sm:text-4xl font-bold capitalize text-center mb-5">
          subscription plan
        </h1>
        <div>
          <p className="text-xl text-[#191D23]">
            choose a plan that's right for you
          </p>
          <div className="flex gap-5 items-center mt-3">
            <p className="text-base text-[#191D23]">pay monthly</p>

            {/* Toggle Switch */}
            <button
              onClick={handleToggle}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-400 ${
                isYearly ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                  isYearly ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>

            <p className="text-base text-[#191D23]">pay yearly</p>
          </div>
        </div>
        {/* details */}
        <div className="flex flex-col lg:flex-row gap-10 mt-10 ">
          {/* free */}
          <div className="free flex flex-col gap-4 w-100 h-140 border border-[#AAAAAA] rounded-md p-6">
            <h2 className="font-bold text-xl sm:text-2xl text-[#191D23]">
              Free
            </h2>
            <p className="text-[#64748B]  mt-2">
              Ideal for individuals who need quick access to basic features.
            </p>

            <div className="mt-4">
              <span className="relative block text-4xl font-bold text-[#191D23]">
                $0{" "}
                <span className="absolute text-sm ml-2 text-[#4B5768] bottom-3">
                  / Month
                </span>
              </span>
              <button className="capitalize w-full border border-blue-600 text-blue-600 font-semibold rounded mt-6 py-2 text-sm">
                get started now
              </button>
              <ul className="flex flex-col gap-4 mt-6 text-sm">
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
          {/* premium */}
          <div className="premium bg-[#3093FC] text-white p-6 rounded-md max-w-[417px] h-140">
            <h2 className="font-bold text-xl sm:text-2xl">Premium</h2>
            <p className="text-gray-200 font-light mt-3 text-sm">
              {isYearly ? premium.yearly.desc : premium.monthly.desc}
            </p>
            <span className="relative mt-4 text-4xl amount w-full font-Maname  block  font-bold">
              {isYearly ? premium.yearly.price : premium.monthly.price}

              <span className="absolute ml-2 text-sm text-white bottom-2">
                /{isYearly ? premium.yearly.timeLine : premium.monthly.timeLine}
              </span>
            </span>
            <button className="capitalize w-full mt-15 py-2 rounded-sm text-blue-700 text-sm font-semibold bg-white">
              get started now
            </button>
            <div>
              <ul className="flex flex-col gap-4 mt-6 text-sm">
                {isYearly
                  ? premium.yearly.opt.map((elm) => (
                      <li className={subscriptionList}>
                        <img src={WebIcons.subscriptionIco} alt="" />
                        <p>{elm}</p>
                      </li>
                    ))
                  : premium.monthly.opt.map((emp) => (
                      <li className={subscriptionList}>
                        <img src={WebIcons.subscriptionIco} alt="" />
                        <p>{emp}</p>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
