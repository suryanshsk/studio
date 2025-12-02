'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, StopCircle, Loader2, Bot, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { interactWithCognova, InteractWithCognovaOutput } from '@/ai/flows/cognova-interact-with-voice-assistant';
import Link from 'next/link';

type Message = {
  role: 'user' | 'assistant';
  text: string;
};

export default function CognovaPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const handleStartRecording = async () => {
    if (isRecording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = handleStopRecording;
      audioChunksRef.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        variant: 'destructive',
        title: 'Microphone Error',
        description: 'Could not access the microphone. Please check your browser permissions.',
      });
    }
  };

  const handleStopRecording = async () => {
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state !== 'recording') return;
    
    mediaRecorderRef.current.stop();
    // The onstop event handler will now trigger the processing logic.
  };
  
  useEffect(() => {
    // This effect runs when recording stops.
    if (!isRecording && audioChunksRef.current.length > 0) {
      processAudio();
    }
  }, [isRecording]);
  
  const processAudio = async () => {
    setIsRecording(false);
    setIsProcessing(true);
    
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    audioChunksRef.current = [];

    // Optional: Add user message placeholder
    setMessages(prev => [...prev, { role: 'user', text: 'Processing your voice query...' }]);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result as string;

        try {
          const result: InteractWithCognovaOutput = await interactWithCognova({ voiceQuery: base64Audio });
          
          setMessages(prev => {
            const newMessages = [...prev];
            // Replace the last "processing" message with the actual response
            const lastMessageIndex = newMessages.length > 0 ? newMessages.length - 1 : 0;
            if(newMessages[lastMessageIndex]?.role === 'user'){
                 newMessages.pop(); // Remove processing message
            }
            newMessages.push({ role: 'assistant', text: result.textResponse });
            return newMessages;
          });

        } catch (err) {
          console.error('Error processing voice query:', err);
          toast({
            variant: 'destructive',
            title: 'AI Error',
            description: 'Failed to process your request. Please try again.',
          });
           setMessages(prev => prev.slice(0, -1)); // Remove processing message on error
        } finally {
          setIsProcessing(false);
        }
      };
    } catch (error) {
      console.error('Error converting blob to base64:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to prepare audio for processing.',
      });
      setIsProcessing(false);
       setMessages(prev => prev.slice(0, -1)); // Remove processing message on error
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/#projects" className="flex items-center gap-2 text-xl font-bold text-primary">
            <ArrowLeft className="w-5 h-5" />
            Back to Portfolio
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <Card className="bg-card/50">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl md:text-4xl">Cognova AI</CardTitle>
              <p className="text-muted-foreground pt-2">A multimodal voice assistant prototype.</p>
              <div className="flex justify-center gap-2 pt-4">
                <Badge variant="secondary">GenAI</Badge>
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">Firebase</Badge>
                <Badge variant="secondary">MediaRecorder API</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-64 overflow-y-auto p-4 border rounded-md space-y-4 bg-muted/20">
                {messages.length === 0 && (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>Your conversation will appear here.</p>
                  </div>
                )}
                {messages.map((msg, index) => (
                  <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    {msg.role === 'assistant' && <Bot className="w-6 h-6 flex-shrink-0 text-primary" />}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`max-w-md rounded-lg p-3 ${msg.role === 'user' ? 'bg-primary/20 text-right' : 'bg-secondary'}`}
                    >
                      <p>{msg.text}</p>
                    </motion.div>
                     {msg.role === 'user' && <User className="w-6 h-6 flex-shrink-0" />}
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  {isRecording ? 'Recording... Click to stop.' : 'Click the icon to start speaking.'}
                </p>
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Button
                    size="icon"
                    className="w-20 h-20 rounded-full"
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 className="h-8 w-8 animate-spin" />
                    ) : isRecording ? (
                      <StopCircle className="h-8 w-8 text-red-500" />
                    ) : (
                      <Mic className="h-8 w-8" />
                    )}
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}