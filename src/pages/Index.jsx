import React, { useState } from 'react';
import ChatApp from '../components/ChatApp';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [username, setUsername] = useState('');
  const [inRoom, setInRoom] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleJoinRoom = () => {
    if (username.trim()) {
      setInRoom(true);
    }
  };

  const handleLeaveRoom = () => {
    setInRoom(false);
    setUsername('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!inRoom ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold mb-4">Welcome to Chat Room</h1>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              className="max-w-xs mx-auto"
            />
            <Button onClick={handleJoinRoom}>Join Room</Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="p-4 bg-white shadow-md">
            <p className="text-xl">Welcome, {username}!</p>
            <Button onClick={handleLeaveRoom} variant="destructive" className="mt-2">Leave Room</Button>
          </div>
          <ChatApp username={username} />
        </div>
      )}
    </div>
  );
};

export default Index;
