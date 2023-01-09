import React, { useRef, useEffect } from 'react';

const Player = ({ isPlaying, activeSong, volume, seekTime, onEnded, onTimeUpdate, onloadedData, repeat }) => {
  const ref = useRef(null);

  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);

  // update audio element only on seekTime change
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <audio
      src={activeSong?.hub?.actions[1]?.uri}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onloadedData}
    />
  );
};

export default Player;
