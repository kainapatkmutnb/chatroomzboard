import React, { useState } from 'react';
import ChatApp from '../components/ChatApp';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from '@/components/ThemeToggle';

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
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      {!inRoom ? (
        <div className="flex items-center justify-center h-screen">
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
          <div className="p-4 bg-card shadow-md">
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
