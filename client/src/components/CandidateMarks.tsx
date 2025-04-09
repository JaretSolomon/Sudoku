import React from "react";
import { AlbumIcons } from "../assets/icons";

interface CandidateMarksProps {
  candidates: boolean[];
  onToggleCandidate: (value: number) => void;
}

const CandidateMarks: React.FC<CandidateMarksProps> = ({ candidates, onToggleCandidate }) => {
  // Layout candidates in a 3x3 grid
  return (
    <div className="candidates-grid grid grid-cols-3 gap-[1px] w-full h-full">
      {candidates.map((isCandidate, index) => (
        <div
          key={index}
          className={`flex items-center justify-center ${isCandidate ? AlbumIcons[index].color : "text-gray-300"} p-0 m-0 cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering parent button
            onToggleCandidate(index);
          }}
          aria-label={`Toggle ${AlbumIcons[index].name} as candidate`}
        >
          {isCandidate && (
            <span className="candidate-icon">
              {React.cloneElement(AlbumIcons[index].icon as React.ReactElement, {
                className: "w-3 h-3" 
              })}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CandidateMarks;