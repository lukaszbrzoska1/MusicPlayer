import React from 'react';

import SongBar from './SongBar';

const RelatedSong = ({ data, isPlaying, activeSong, artistId, handlePauseClick, handlePlayClick }) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">{artistId ? 'Top-Songs' : 'Related Songs:'}</h1>

    <div className="flex flex-col w-full mt-6">
      {data?.map((song, i) => (
        <SongBar
          key={`${song?.key ?? song?.id}-${artistId}`}
          song={song}
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSong;
