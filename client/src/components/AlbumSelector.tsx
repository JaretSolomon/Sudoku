import React, { useRef, useEffect } from "react";
import { AlbumIcons, type Album } from "../assets/icons";

interface AlbumSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (value: number | null) => void;
  position: { x: number; y: number } | null;
}

const AlbumSelector: React.FC<AlbumSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
  position
}) => {
  const selectorRef = useRef<HTMLDivElement>(null);

  // Close the selector when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !position) return null;

  // Calculate position, ensuring the popup stays within viewport
  const positionStyle = {
    position: 'fixed' as const,
    top: `${position.y}px`,
    left: `${position.x}px`,
    transform: 'translate(-50%, 10px)',
    zIndex: 1000,
  };

  return (
    <div 
      ref={selectorRef} 
      className="album-selector bg-white rounded-lg border-2 border-primary/20 p-3"
      style={positionStyle}
    >
      <div className="grid grid-cols-5 gap-2">
        {AlbumIcons.map((album) => (
          <button
            key={album.id}
            className={`flex flex-col items-center p-2 rounded-md transition-colors ${album.color}`}
            onClick={() => {
              onSelect(album.id);
              onClose();
            }}
            aria-label={album.name}
          >
            <span className="album-icon text-lg">{album.icon}</span>
            <span className="text-xs mt-1 text-gray-700 font-medium">{album.name}</span>
          </button>
        ))}
        <button
          className="flex flex-col items-center p-2 rounded-md transition-colors"
          onClick={() => {
            onSelect(null);
            onClose();
          }}
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
    </div>
  );
};

export default AlbumSelector;