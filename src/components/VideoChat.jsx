import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button"

const VideoChat = ({ roomId, username }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState({});
  const localVideoRef = useRef(null);
  const peerConnections = useRef({});

  useEffect(() => {
    const startVideoChat = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        // Here you would typically connect to a signaling server and set up peer connections
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    startVideoChat();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      Object.values(peerConnections.current).forEach(pc => pc.close());
    };
  }, [roomId]);

  // This function would be called when a new peer joins the room
  const handleNewPeer = async (peerId) => {
    const peerConnection = new RTCPeerConnection();
    peerConnections.current[peerId] = peerConnection;

    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
      setRemoteStreams(prev => ({
        ...prev,
        [peerId]: event.streams[0]
      }));
    };

    // Here you would handle ICE candidates and signaling
  };

  return (
    <div className="video-chat">
      <div className="local-video">
        <video ref={localVideoRef} autoPlay muted playsInline />
      </div>
      <div className="remote-videos">
        {Object.entries(remoteStreams).map(([peerId, stream]) => (
          <video key={peerId} autoPlay playsInline ref={el => {
            if (el) el.srcObject = stream;
          }} />
        ))}
      </div>
      <Button onClick={() => {/* Implement leave call functionality */}}>Leave Call</Button>
    </div>
  );
};

export default VideoChat;