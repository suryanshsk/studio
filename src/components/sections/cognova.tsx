'use client';

import { useState, useRef } from 'react';
import { Mic, StopCircle, Loader2, Bot } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { interactWithCognova } from '@/ai/flows/cognova-interact-with-voice-assistant';
import { cn } from '@/lib/utils';

export default function CognovaSection() {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textResponse, setTextResponse] = useState('');
  const [error, setError] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleStartRecording = async () => {
    setError('');
    setTextResponse('');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        mediaRecorderRef.current.onstop = handleStopRecording;
        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Error accessing microphone:', err);
        setError('Microphone access denied. Please allow microphone access in your browser settings.');
      }
    } else {
      setError('Audio recording is not supported by your browser.');
    }
  };

  const handleStopRequest = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    setIsLoading(true);

    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    audioChunksRef.current = [];

    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const base64Audio = reader.result as string;
      try {
        const response = await interactWithCognova({ voiceQuery: base64Audio });
        setTextResponse(response.textResponse);
      } catch (e) {
        console.error(e);
        setError('An error occurred while processing your request.');
      } finally {
        setIsLoading(false);
      }
    };
  };

  return (
    <section id="cognova" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Project: Cognova AI
            </h2>
            <p className="text-muted-foreground">
              Cognova is an advanced AI-powered voice assistant I developed to showcase the power of generative AI in understanding and responding to natural language. It can transcribe spoken queries and provide intelligent, context-aware answers in real-time.
            </p>
            <p className="text-muted-foreground">
              This project integrates modern web technologies with cutting-edge AI models. Try it out yourself!
            </p>
          </div>
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-primary" />
                Interact with Cognova
              </CardTitle>
              <CardDescription>
                {isRecording ? "Click stop when you're done speaking." : "Click the mic to start speaking."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                {!isRecording ? (
                  <Button size="icon" className="h-20 w-20 rounded-full bg-primary hover:bg-primary/90" onClick={handleStartRecording} disabled={isLoading}>
                    <Mic className="h-10 w-10" />
                  </Button>
                ) : (
                  <Button size="icon" variant="destructive" className="h-20 w-20 rounded-full animate-pulse" onClick={handleStopRequest}>
                    <StopCircle className="h-10 w-10" />
                  </Button>
                )}
              </div>
              
              <div className="min-h-[100px] p-4 rounded-md border border-dashed text-sm text-muted-foreground flex items-center justify-center">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span>Cognova is thinking...</span>
                  </div>
                ) : textResponse ? (
                  <p className="text-foreground">{textResponse}</p>
                ) : (
                  <p>Your response will appear here.</p>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
