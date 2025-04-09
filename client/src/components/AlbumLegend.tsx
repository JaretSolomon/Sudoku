import React from "react";
import { AlbumIcons } from "../assets/icons";

const AlbumLegend: React.FC = () => {
  return (
    <div className="mb-6 p-3 rounded-lg bg-secondary bg-opacity-30 w-full max-w-2xl">
      <h2 className="text-center font-display text-lg mb-2">Album Icons</h2>
      <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 justify-items-center">
        {AlbumIcons.map((album) => (
          <div key={album.id} className="flex flex-col items-center">
            <div className="w-8 h-8 flex items-center justify-center album-icon">
              <span className={album.color}>{album.icon}</span>
            </div>
            <span className="text-xs mt-1">{album.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumLegend;
