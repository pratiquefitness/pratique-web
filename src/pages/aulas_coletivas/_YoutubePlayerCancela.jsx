// src/pages/aulas_coletivas/_YoutubePlayer.jsx

import React, { useEffect, useRef } from 'react'
import { FloatButton } from 'antd'
import { GiCancel } from 'react-icons/gi'

export default function YoutubePlayer({ id, onClose, onEnd, startTime }) {
  const playerRef = useRef(null)
  const lastTimeRef = useRef(startTime || 0)
  const checkTimeIntervalRef = useRef(null)

  useEffect(() => {
    let player

    const onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player(`youtube-player-${id}`, {
        videoId: id,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          controls: 1, // Exibe os controles do player
          disablekb: 0, // Permite o uso do teclado
          start: startTime || 0,
          origin: window.location.origin,
          modestbranding: 1,
          fs: 1, // Permite tela cheia
          rel: 0, // Desabilita vídeos relacionados
          playsinline: 1 // Reproduz em linha em dispositivos móveis
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      })
    }

    // Verificar se a API já foi carregada
    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady()
    } else {
      // Carregar o script da API do YouTube
      const existingScript = document.getElementById('youtube-iframe-api')
      if (!existingScript) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        tag.id = 'youtube-iframe-api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      }
      // Atribuir a função ready
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady
    }

    function onPlayerReady(event) {
      playerRef.current = player

      // Iniciar o intervalo para monitorar o tempo de reprodução
      checkTimeIntervalRef.current = setInterval(() => {
        if (playerRef.current && playerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING) {
          const currentTime = playerRef.current.getCurrentTime()
          const lastTime = lastTimeRef.current

          // Permitir uma tolerância de 2 segundos
          if (currentTime > lastTime + 2) {
            // O usuário tentou pular adiante, voltar ao último tempo permitido
            playerRef.current.seekTo(lastTime, true)
          } else {
            lastTimeRef.current = currentTime
          }
        }
      }, 1000)
    }

    function onPlayerStateChange(event) {
      if (event.data === window.YT.PlayerState.ENDED) {
        // Vídeo terminou
        if (checkTimeIntervalRef.current) {
          clearInterval(checkTimeIntervalRef.current)
          checkTimeIntervalRef.current = null
        }
        if (onEnd) {
          onEnd()
        }
        localStorage.removeItem(`video-${id}-currentTime`)
      }
      // Não precisamos mais impedir que o usuário pause o vídeo
    }

    return () => {
      // Limpar intervalos e destruir o player ao desmontar o componente
      if (checkTimeIntervalRef.current) {
        clearInterval(checkTimeIntervalRef.current)
      }
      if (player && player.destroy) {
        player.destroy()
      }
      // Limpar a função ready da API
      delete window.onYouTubeIframeAPIReady
    }
  }, [id, onEnd, startTime])

  return (
    <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '177.78%' }}>
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
