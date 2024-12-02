// src/pages/aulas_coletivas/_YoutubePlayer.jsx
import React, { useEffect, useRef } from 'react'
import { FloatButton } from 'antd'
import { GiCancel } from 'react-icons/gi'

export default function YoutubePlayer({ id, onClose, onEnd }) {
  const playerRef = useRef(null)

  useEffect(() => {
    // Carrega o código da API IFrame do YouTube de forma assíncrona.
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    let player
    window.onYouTubeIframeAPIReady = function () {
      player = new window.YT.Player(`youtube-player-${id}`, {
        videoId: id,
        events: {
          onStateChange: onPlayerStateChange
        },
        playerVars: {
          autoplay: 1,
          controls: 1
        }
      })
    }

    function onPlayerStateChange(event) {
      if (event.data === window.YT.PlayerState.ENDED) {
        if (onEnd) {
          onEnd()
        }
      }
    }

    // Limpeza ao desmontar o componente
    return () => {
      if (player && player.destroy) {
        player.destroy()
      }
    }
  }, [id, onEnd])

  return (
    <div className="youtube-fullscreen">
      <div id={`youtube-player-${id}`} />
      <FloatButton icon={<GiCancel />} className="youtube-close" onClick={onClose} style={{ zIndex: 99 }} />
    </div>
  )
}
