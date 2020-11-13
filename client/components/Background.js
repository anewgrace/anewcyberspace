import React from 'react'

export default function Background({showHead}) {
  return (
    <div>
      <div id="backgroundOverlay" />
      <img id="background" src="/Images/CybergraceBackground.jpg" />
      <div id="imageOverlay" />
      {window.location.href.split('/')[3] === 'home' ||
      !window.location.href.split('/')[3] ? (
        <img id="cyberHead" src="/Images/CyberHead.png" />
      ) : (
        <></>
      )}
    </div>
  )
}
