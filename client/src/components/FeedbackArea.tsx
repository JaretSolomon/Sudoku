import React from "react";

interface FeedbackAreaProps {
  showSuccess: boolean;
  showError: boolean;
  onClose: () => void;
  isCompleted?: boolean;
}

const FeedbackArea: React.FC<FeedbackAreaProps> = ({
  showSuccess,
  showError,
  onClose,
  isCompleted = false,
}) => {
  return (
    <div className="mb-6 min-h-16">
      {showSuccess && (
        <div className={`p-3 rounded-lg bg-success bg-opacity-20 text-center ${isCompleted ? 'animate-pulse' : ''}`}>
          <p className="text-green-800 font-medium flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
            {isCompleted 
              ? "Amazing! Your solution is correct!" 
              : "Looking good so far! Keep going, your solution is on the right track."}
          </p>
        </div>
      )}

      {showError && (
        <div className="p-3 rounded-lg bg-error bg-opacity-20 text-center">
          <p className="text-red-800 font-medium flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              />
            </svg>
            There are some errors in your solution. Check for duplicate albums in rows, columns, or 3x3 boxes.
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedbackArea;
