import React from 'react';

const HabitItemSkeleton: React.FC = () => {
  return (
    <div className="flex p-2 shadow-md border mt-4 bg-white justify-between animate-pulse">
      {/* Placeholder for habit details */}
      <div className="flex-1 ml-4">
        <div className="flex gap-2">
          <div className="w-32 h-6 bg-gray-300 rounded"></div>
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="mt-4">
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Placeholder for checkbox and remaining times */}
      <div className="mt-2 flex items-center gap-2">
        <label className="flex items-center cursor-pointer">
          <div
            className={`w-6 h-6 border-2 rounded-full flex justify-center items-center bg-gray-200 border-gray-300`}
          >
            {/* Placeholder for checkmark icon */}
            <svg
              className="w-4 h-4 text-gray-100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <div className="ml-2 w-24 h-4 bg-gray-300 rounded"></div>
        </label>
      </div>
    </div>
  );
};

export default HabitItemSkeleton;
