import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHovering = false;

    // Only render cursor if it's a pointer device (not touch)
    if (window.matchMedia("(pointer: coarse)").matches) {
      if (dotRef.current) dotRef.current.style.display = 'none';
      if (ringRef.current) ringRef.current.style.display = 'none';
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]')
      ) {
        isHovering = true;
      } else {
        isHovering = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    const render = () => {
      // Ring follows mouse with easing
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${isHovering ? 1.5 : 1})`;
        if (isHovering) {
          ringRef.current.style.borderColor = 'rgba(53, 192, 255, 0.8)';
          ringRef.current.style.backgroundColor = 'rgba(53, 192, 255, 0.1)';
        } else {
          ringRef.current.style.borderColor = 'rgba(53, 192, 255, 0.4)';
          ringRef.current.style.backgroundColor = 'transparent';
        }
      }

      requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: -20,
          left: -20,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(53, 192, 255, 0.4)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.1s ease-out, border-color 0.2s, background-color 0.2s',
          mixBlendMode: 'screen'
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#35c0ff',
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'screen'
        }}
      />
    </>
  );
}
