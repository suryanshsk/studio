'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer'
      );
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <motion.div
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full bg-primary/50 mix-blend-difference md:block'
      )}
      style={{
        x: position.x,
        y: position.y,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: isPointer ? 32 : 16,
        height: isPointer ? 32 : 16,
        scale: isPressed ? 0.8 : 1,
        backgroundColor: isPointer ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.5)',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    />
  );
}
