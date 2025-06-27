import React from "react";

const SubscriptionPlan = () => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="w-[981px] h-[723px] bg-white shadow-lg rounded-xl flex flex-col items-center justify-center relative">
        <h1 className="text-2xl font-semibold capitalize mb-4">
          Subscription Plan
        </h1>
        <div className="flex gap-4 font-Roboto">
          {/* Free */}
          <div className="free flex flex-col gap-3    w-100 h-140 border-2 border-Primary p-10">
            <h2 className="font-bold text-2xl">Free</h2>
            <p className="text-gray-400">Ideal for individuals who need quick access to basic features.</p>
            <div>
                <span className="relative amount w-full block text-4xl font-bold">$0 <span className="absolute text-sm text-gray-400 font-light bottom-0`">/Month</span></span>
            </div>
          </div>
          {/* Premium */}
          <div className="w-40 h-40 bg-yellow-300 flex items-center justify-center rounded-lg">
            Premium
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
