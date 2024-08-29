import React, { useState } from 'react';
import ChatApp from '../components/ChatApp';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from '@/components/ThemeToggle';
import { Trash2 } from "lucide-react";

const Index = () => {
  const [username, setUsername] = useState('');
  const [inRoom, setInRoom] = useState(false);
  const [rooms, setRooms] = useState([
    { id: 1, name: 'General' },
    { id: 2, name: 'Random' },
    { id: 3, name: 'Tech Talk' },
  ]);

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

  const deleteRoom = (id) => {
    setRooms(rooms.filter(room => room.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      {!inRoom ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-center space-y-4 mb-8">
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
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
            {rooms.map((room) => (
              <div key={room.id} className="flex justify-between items-center bg-card p-4 rounded-lg shadow mb-4">
                <span className="text-xl">{room.name}</span>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteRoom(room.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
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
