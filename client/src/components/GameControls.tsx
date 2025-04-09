import React from "react";

interface GameControlsProps {
  onReset: () => void;
  onValidate: () => void;
  onHint: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  onReset,
  onValidate,
  onHint,
}) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      <button
        className="px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all transform hover:scale-105 active:scale-95 shadow-sm"
        onClick={onReset}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 inline-block mr-1"
        >
          <path
            fillRule="evenodd"
            d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
            clipRule="evenodd"
          />
        </svg>
        Reset
      </button>

      <button
        className="px-4 py-2 bg-secondary text-textColor rounded-full font-medium hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all transform hover:scale-105 active:scale-95 shadow-sm"
        onClick={onValidate}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 inline-block mr-1"
        >
          <path
            fillRule="evenodd"
            d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 0 1 1.04-.208Z"
            clipRule="evenodd"
          />
        </svg>
        Check Solution
      </button>

      <button
        className="px-4 py-2 bg-accent text-textColor rounded-full font-medium hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all transform hover:scale-105 active:scale-95 shadow-sm"
        onClick={onHint}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 inline-block mr-1"
        >
          <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.75 6.75 0 1 1 2.8-5.718.75.75 0 0 0 1.214.882 7.493 7.493 0 0 1 1.768 2.23.75.75 0 0 1-.271.896A8.25 8.25 0 0 0 12 .75Z" />
          <path
            fillRule="evenodd"
            d="M12.53 16.28a.75.75 0 0 1-.75.75 6.75 6.75 0 0 1-6.75-6.75.75.75 0 0 1 1.5 0A5.25 5.25 0 0 0 11.78 15.5a.75.75 0 0 1 .75.75ZM7.758 17.03a.75.75 0 0 1-1.06 0A8.252 8.252 0 0 1 3.75 9.75a.75.75 0 0 1 1.5 0 6.752 6.752 0 0 0 2.507 5.28.75.75 0 0 1 0 1.06Z"
            clipRule="evenodd"
          />
        </svg>
        Hint
      </button>
    </div>
  );
};

export default GameControls;
