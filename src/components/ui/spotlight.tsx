'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform, useScroll } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpotlightProps = {
  className?: string;
  size?: number;
  fill?: string;
};

export function Spotlight({
  className,
  size = 200,
  fill = "white"
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);
  const [isSafari, setIsSafari] = useState(false);

  // Detect Safari
  useEffect(() => {
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(isSafariBrowser);
  }, []);

  const mouseX = useSpring(0);
  const mouseY = useSpring(0);

  // Add scroll progress for Safari
  const { scrollYProgress } = useScroll();
  const scrollSpotlightY = useTransform(scrollYProgress, [0, 1], [0, 500]);

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = isSafari 
    ? useTransform(scrollSpotlightY, (y) => `${y - size / 2}px`)
    : useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement || isSafari) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement, isSafari]
  );

  useEffect(() => {
    if (!parentElement) return;

    if (!isSafari) {
      parentElement.addEventListener('mousemove', handleMouseMove);
      parentElement.addEventListener('mouseenter', () => setIsHovered(true));
      parentElement.addEventListener('mouseleave', () => setIsHovered(false));

      return () => {
        parentElement.removeEventListener('mousemove', handleMouseMove);
        parentElement.removeEventListener('mouseenter', () => setIsHovered(true));
        parentElement.removeEventListener('mouseleave', () => setIsHovered(false));
      };
    } else {
      setIsHovered(true); // Always show spotlight for Safari
    }
  }, [parentElement, handleMouseMove, isSafari]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute rounded-full bg-gradient-to-b from-white to-transparent blur-2xl transition-opacity duration-500',
        isHovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
        background: `radial-gradient(circle at center, ${fill}, transparent)`,
      }}
    />
  );
}