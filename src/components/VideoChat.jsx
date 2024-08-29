import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button"
import { MicIcon, MicOffIcon, VideoIcon, VideoOffIcon } from 'lucide-react';

const VideoChat = ({ roomId, username }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState({});
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
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

  const toggleMic = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(audioTrack.enabled);
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsCameraOn(videoTrack.enabled);
    }
  };

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
      <div className="controls flex justify-center space-x-4 mt-4">
        <Button onClick={toggleMic} variant={isMicOn ? "default" : "secondary"}>
          {isMicOn ? <MicIcon /> : <MicOffIcon />}
        </Button>
        <Button onClick={toggleCamera} variant={isCameraOn ? "default" : "secondary"}>
          {isCameraOn ? <VideoIcon /> : <VideoOffIcon />}
        </Button>
        <Button onClick={() => {/* Implement leave call functionality */}} variant="destructive">Leave Call</Button>
      </div>
    </div>
  );
};

export default VideoChat;
