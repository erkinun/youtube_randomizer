import { useEffect, useState } from "react";

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

export const YoutubePlayer = ({ }) => {
  const [videos, setVideos] = useState([])

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  function pickRandomVideo() {
    if (videos.length === 0) return 'otV4xSdXLh0';

    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    return randomVideo
  }

  useEffect(() => {
    async function fetchRandomVideos() {
      const videosResult = await fetch(`https://youtube.googleapis.com/youtube/v3/search?maxResults=50&q=funny_birds&key=${import.meta.env.VITE_API_KEY}`)
      const videos = await videosResult.json()
      const videoIds = videos.items?.map(video => video.id.videoId);
      setVideos(videoIds)
    }
    fetchRandomVideos()
  }, [])


  return (
    <div className="card">
      <LiteYouTubeEmbed
          id={pickRandomVideo()}
          title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
        />
    </div>
  )
}