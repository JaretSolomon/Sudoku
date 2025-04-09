import React from "react";
import { AlbumIcons } from "../assets/icons";

interface AlbumKeypadProps {
  onSelect: (value: number | null) => void;
  selectedValue: number | null;
  isNotesMode?: boolean;
  onToggleNotesMode?: () => void;
}

const AlbumKeypad: React.FC<AlbumKeypadProps> = ({ 
  onSelect, 
  selectedValue,
  isNotesMode = false,
  onToggleNotesMode = () => {}
}) => {
  return (
    <div className="album-keypad bg-white rounded-lg border-2 border-primary/20 p-4 shadow-md">
      <h3 className="text-center font-display text-lg text-gray-700 mb-3">Album Selection</h3>
      <div className="grid grid-cols-3 gap-2">
        {AlbumIcons.map((album) => (
          <button
            key={album.id}
            className={`flex flex-col items-center p-2 rounded-md transition-colors ${album.color} ${
              selectedValue === album.id ? "bg-primary/10 ring-2 ring-primary/30" : ""
            }`}
            onClick={() => onSelect(album.id)}
            aria-label={album.name}
          >
            <span className="album-icon text-lg">{album.icon}</span>
            <span className="text-xs mt-1 text-gray-700 font-medium">{album.name}</span>
          </button>
        ))}
        <button
          className={`flex flex-col items-center p-2 rounded-md transition-colors ${
            selectedValue === null ? "bg-primary/10 ring-2 ring-primary/30" : ""
          }`}
          onClick={() => onSelect(null)}
          aria-label="Clear"
        >
          <span className="album-icon text-lg text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </span>
          <span className="text-xs mt-1 text-gray-700 font-medium">Clear</span>
        </button>
      </div>

      <div className="mt-4 border-t border-gray-200 pt-3">
        <h3 className="text-center font-display text-base text-gray-700 mb-2">Input Mode</h3>
        <div className="flex justify-center gap-2">
          <button
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${
              !isNotesMode 
                ? "bg-primary text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors`}
            onClick={onToggleNotesMode}
            aria-label="Normal mode"
            title="Normal mode"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            </svg>
            Normal
          </button>
          <button
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${
              isNotesMode 
                ? "bg-primary text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors`}
            onClick={onToggleNotesMode}
            aria-label="Notes mode"
            title="Notes mode"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd" />
            </svg>
            Notes
          </button>
        </div>
      </div>

      <div className="mt-4 bg-gray-50 p-3 rounded-md">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Keyboard Shortcuts:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li><span className="font-mono bg-gray-200 px-1 rounded">1-9</span> - Select album</li>
          <li><span className="font-mono bg-gray-200 px-1 rounded">N</span> - Toggle notes mode</li>
          <li><span className="font-mono bg-gray-200 px-1 rounded">Del</span> / <span className="font-mono bg-gray-200 px-1 rounded">Backspace</span> - Clear cell</li>
          <li><span className="font-mono bg-gray-200 px-1 rounded">Arrow keys</span> - Navigate cells</li>
        </ul>
      </div>
    </div>
  );
};

export default AlbumKeypad;