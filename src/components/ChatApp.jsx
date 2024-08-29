import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoIcon, PenToolIcon } from 'lucide-react';
import Whiteboard from './Whiteboard';

const ChatApp = ({ username }) => {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [isVideoMode, setIsVideoMode] = useState(false);

  useEffect(() => {
    // Здесь будет логика подключения к серверу
    // и получения списка комнат
  }, []);

  const createRoom = () => {
    if (newRoomName) {
      const newRoom = { id: Date.now(), name: newRoomName, users: [] };
      setRooms([...rooms, newRoom]);
      setNewRoomName('');
    }
  };

  const joinRoom = (room) => {
    setCurrentRoom(room);
    // Здесь будет логика присоединения к комнате на сервере
  };

  const sendMessage = () => {
    if (newMessage && currentRoom) {
      const message = {
        id: Date.now(),
        text: newMessage,
        username: username,
        timestamp: new Date().toISOString(),
        isOwnMessage: true,
      };
      setMessages([...messages, message]);
      setNewMessage('');
      // Здесь будет логика отправки сообщения на сервер
    }
  };

  const toggleVideoMode = () => {
    setIsVideoMode(!isVideoMode);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Chat App</h1>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex mb-2">
              <Input
                type="text"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="New room name"
                className="mr-2"
              />
              <Button onClick={createRoom}>Create</Button>
            </div>
            <ScrollArea className="h-[300px]">
              {rooms.map((room) => (
                <Button
                  key={room.id}
                  onClick={() => joinRoom(room)}
                  className="w-full mb-2"
                  variant={currentRoom?.id === room.id ? "secondary" : "outline"}
                >
                  {room.name}
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>{currentRoom ? currentRoom.name : 'Select a room'}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentRoom && (
              <>
                <Tabs defaultValue="chat">
                  <TabsList className="mb-4">
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="video" onClick={toggleVideoMode}>
                      <VideoIcon className="mr-2 h-4 w-4" />
                      Video
                    </TabsTrigger>
                    <TabsTrigger value="whiteboard">
                      <PenToolIcon className="mr-2 h-4 w-4" />
                      Whiteboard
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="chat">
                    <ScrollArea className="h-[400px] mb-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex items-start mb-4 ${message.isOwnMessage ? 'justify-end' : ''}`}>
                          {!message.isOwnMessage && (
                            <Avatar className="mr-2">
                              <AvatarFallback>{message.username[0]}</AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`${message.isOwnMessage ? 'bg-primary/10 dark:bg-primary/20 rounded-lg p-2' : ''}`}>
                            <div className="flex items-center">
                              <span className={`font-bold mr-2 ${message.isOwnMessage ? 'text-primary' : ''}`}>
                                {message.isOwnMessage ? 'You' : message.username}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {new Date(message.timestamp).toLocaleTimeString()}
                              </Badge>
                            </div>
                            <p>{message.text}</p>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                    <div className="flex">
                      <Input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="mr-2"
                      />
                      <Button onClick={sendMessage}>Send</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="video">
                    {isVideoMode && <div>Video chat component will be here</div>}
                  </TabsContent>
                  <TabsContent value="whiteboard">
                    <Whiteboard />
                  </TabsContent>
                </Tabs>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatApp;
