import React, { useState } from 'react';
import ChatApp from '../components/ChatApp';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from '@/components/ThemeToggle';
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const [username, setUsername] = useState('');
  const [inRoom, setInRoom] = useState(false);
  const [warning, setWarning] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setWarning('');
  };

  const handleJoinRoom = () => {
    if (username.trim()) {
      setInRoom(true);
    } else {
      setWarning('Please enter a username before joining.');
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
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold mb-4">Welcome to Chat App</h1>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              className="max-w-xs mx-auto"
            />
            {warning && (
              <Alert variant="destructive" className="max-w-xs mx-auto">
                <AlertDescription>{warning}</AlertDescription>
              </Alert>
            )}
            <Button onClick={handleJoinRoom}>Join</Button>
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
