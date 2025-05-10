"use client";
import React, { useEffect, useState } from "react";
import TrackList from "./TrackList";
import Style from "../../../../../styles/ViewAlbums.module.css";
import TrackDetails from "./TrackDetails";
import AudioPlayer from "./AudioPlayer";

interface TrackSectionProps {
  albumId: string;
}

const TrackSection: React.FC<TrackSectionProps> = ({ albumId }) => {
  const [showTrackDetails, setShowTrackDetails] = useState(false);
  const [trackId, setTrackId] = useState<string | null>(null);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [audio, setAudio] = useState({
    songName: "",
    songUrl: "",
  });

  const handleTrackClick = (trackId: string) => {
    setShowTrackDetails(true);

    setTrackId(trackId);
  };

  const getSongNameUrl = (songName: string, audioUrl: string) => {
    setShowAudioPlayer(true);

    setAudio({ songName, songUrl: audioUrl });
  };

  useEffect(() => {
    setTrackId(trackId);
  }, [trackId]);

  return (
    <div>
      <div className={`mt-3 ${Style.trackContainer}`}>
        <div className={`p-1 ${Style.tracksContainer}`}>
          <div className={`mt-3 ${Style.trackDetailsTop}`}>
            <h5 className={Style.subheading}>Tracks</h5>
          </div>

          {albumId && (
            <TrackList albumId={albumId} onTrackClick={handleTrackClick} />
          )}
        </div>

        
          {showTrackDetails && trackId && (
            <TrackDetails trackId={trackId} onFetchDetails={getSongNameUrl} />
          )}
        

      </div>

      {showAudioPlayer && (
        <AudioPlayer trackName={audio.songName} audioSrc={audio.songUrl} />
      )}
    </div>
  );
};

export default TrackSection;
