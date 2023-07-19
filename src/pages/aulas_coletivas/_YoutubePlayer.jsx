import { FloatButton } from 'antd'
import { GiCancel } from 'react-icons/gi'

export default function YoutubePlayer({ id, onClose }) {
  return (
    <div className="youtube-fullscreen">
      <iframe
        width="100%"
        height="200"
        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
        title="YoutubePlayer"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <FloatButton icon={<GiCancel />} className="youtube-close" onClick={onClose} />
    </div>
  )
}
