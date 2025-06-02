"use client";

import { useSellForm } from "@/context/SellFormContext";

export default function ProgressIndicator() {
  const { step } = useSellForm();

  return (
    <div className="mb-8">
      <div className="flex items-center">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
          } font-medium`}
        >
          1
        </div>
        <div
          className={`h-1 flex-1 mx-2 ${
            step >= 2 ? "bg-blue-600" : "bg-gray-200"
          }`}
        ></div>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
          } font-medium`}
        >
          2
        </div>
        <div
          className={`h-1 flex-1 mx-2 ${
            step >= 3 ? "bg-blue-600" : "bg-gray-200"
          }`}
        ></div>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
          } font-medium`}
        >
          3
        </div>
        <div
          className={`h-1 flex-1 mx-2 ${
            step >= 4 ? "bg-blue-600" : "bg-gray-200"
          }`}
        ></div>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            step >= 4 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
          } font-medium`}
        >
          4
        </div>
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <div className="text-center w-10">Type</div>
        <div className="text-center">Details</div>
        <div className="text-center">Photos</div>
        <div className="text-center w-10">Review</div>
      </div>
    </div>
  );
}
