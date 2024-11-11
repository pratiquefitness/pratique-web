import { FloatButton } from "antd";
import { GiCancel } from "react-icons/gi";
import React, { useEffect, useState } from "react";

export default function SproutPlayer({ id, onClose }) {
  return (
    <div className="youtube-fullscreen">
      <iframe
        width="100%"
        height="200"
        src={`https://videos.sproutvideo.com/embed/${id}`}
        title="YoutubePlayer"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen={false}
      ></iframe>
      <FloatButton
        icon={<GiCancel />}
        className="youtube-close"
        onClick={onClose}
        style={{ zIndex: 99 }}
      />
    </div>
  );
}
