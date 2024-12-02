// src/pages/aulas_coletivas/_YoutubePlayer.jsx

import React, { useEffect, useRef } from 'react'
import { FloatButton } from 'antd'
import { GiCancel } from 'react-icons/gi'

export default function YoutubePlayer({ id, onClose, onEnd, startTime }) {
  const playerRef = useRef(null)

  useEffect(() => {
    let player

    const onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player(`youtube-player-${id}`, {
        videoId: id,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          controls: 1,
          start: startTime || 0,
          origin: window.location.origin,
          modestbranding: 1
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      })
    }

    // Check if the API is already loaded
    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady()
    } else {
      // Load the YouTube API script
      const existingScript = document.getElementById('youtube-iframe-api')
      if (!existingScript) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        tag.id = 'youtube-iframe-api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      }
      // Assign the ready function
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady
    }

    function onPlayerReady(event) {
      playerRef.current = player
      // Save current time every second
      playerRef.current.timeUpdateInterval = setInterval(() => {
        const currentTime = playerRef.current.getCurrentTime()
        localStorage.setItem(`video-${id}-currentTime`, currentTime)
      }, 1000)
    }

    function onPlayerStateChange(event) {
      if (event.data === window.YT.PlayerState.ENDED) {
        if (onEnd) {
          onEnd()
        }
        localStorage.removeItem(`video-${id}-currentTime`)
      }
    }

    return () => {
      if (playerRef.current && playerRef.current.timeUpdateInterval) {
        clearInterval(playerRef.current.timeUpdateInterval)
      }
      if (player && player.destroy) {
        player.destroy()
      }
      // Clean up the API ready function
      delete window.onYouTubeIframeAPIReady
    }
  }, [id, onEnd, startTime])

  return (
    <div style={{ position: 'relative', paddingBottom: '177.78%', height: 0 }}>
      <div
        id={`youtube-player-${id}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
      <FloatButton
        icon={<GiCancel />}
        onClick={onClose}
        style={{ zIndex: 99, position: 'absolute', top: 10, right: 10 }}
      />
    </div>
  )
}
