import { useEffect, useRef, useState } from 'react';

interface ColorWheelAdvancedProps {
  hue: number;
  brightness: number;
  saturation: number;
  triadMode: boolean;
  onHueChange: (hue: number) => void;
  onBrightnessChange: (brightness: number) => void;
}

export default function ColorWheelAdvanced({
  hue,
  brightness,
  saturation,
  triadMode,
  onHueChange,
  onBrightnessChange,
}: ColorWheelAdvancedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const size = 280;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 8;

    ctx.clearRect(0, 0, size, size);

    // Draw conical gradient color wheel
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const pixelIndex = i / 4;
      const y = Math.floor(pixelIndex / size);
      const x = pixelIndex % size;

      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= radius) {
        let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        if (angle < 0) angle += 360;

        const sat = Math.min((dist / radius) * 100, 100);

        const hslToRgb = (h: number, s: number, l: number) => {
          s /= 100; l /= 100;
          const a = s * Math.min(l, 1 - l);
          const f = (n: number) => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color);
          };
          return [f(0), f(8), f(4)];
        };

        const [r, g, b] = hslToRgb(angle, sat, 50);
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = 255;
      } else {
        data[i + 3] = 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // Draw circle border
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw triad connecting lines first (behind markers)
    if (triadMode) {
      const triadHues = [hue, (hue + 120) % 360, (hue + 240) % 360];
      const pointerDist = (radius * (brightness / 100)) * 0.8 + radius * 0.1;

      const points = triadHues.map(h => {
        const a = (h / 360) * Math.PI * 2 - Math.PI / 2;
        return {
          x: centerX + Math.cos(a) * pointerDist,
          y: centerY + Math.sin(a) * pointerDist,
        };
      });

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[1].x, points[1].y);
      ctx.lineTo(points[2].x, points[2].y);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.fill();
    }

    // Draw marker(s)
    const drawMarker = (markerHue: number, isPrimary: boolean) => {
      const angle = (markerHue / 360) * Math.PI * 2 - Math.PI / 2;
      const pointerRadius = (radius * (brightness / 100)) * 0.8 + radius * 0.1;
      const px = centerX + Math.cos(angle) * pointerRadius;
      const py = centerY + Math.sin(angle) * pointerRadius;

      const markerSize = isPrimary ? 8 : 7;

      // Outer glow for primary
      if (isPrimary) {
        ctx.beginPath();
        ctx.arc(px, py, markerSize + 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fill();
      }

      // White border
      ctx.beginPath();
      ctx.arc(px, py, markerSize, 0, Math.PI * 2);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = isPrimary ? 3 : 2;
      ctx.stroke();

      // Hue-colored inner
      ctx.beginPath();
      ctx.arc(px, py, markerSize, 0, Math.PI * 2);
      ctx.strokeStyle = `hsl(${markerHue}, 100%, 50%)`;
      ctx.lineWidth = isPrimary ? 1.5 : 1;
      ctx.stroke();

      // Inner dot for secondary
      if (!isPrimary) {
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${markerHue}, 100%, 70%)`;
        ctx.fill();
      }
    };

    if (triadMode) {
      drawMarker((hue + 240) % 360, false);
      drawMarker((hue + 120) % 360, false);
      drawMarker(hue, true);
    } else {
      drawMarker(hue, true);
    }
  }, [hue, brightness, triadMode]);

  const handleCanvasInteraction = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = size / rect.width;
    const scaleY = size / rect.height;
    const x = (e.clientX - rect.left) * scaleX - size / 2;
    const y = (e.clientY - rect.top) * scaleY - size / 2;

    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    onHueChange(Math.round(angle) % 360);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    handleCanvasInteraction(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    handleCanvasInteraction(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalUp = () => setIsDragging(false);
      window.addEventListener('mouseup', handleGlobalUp);
      return () => window.removeEventListener('mouseup', handleGlobalUp);
    }
  }, [isDragging]);

  const getSelectedColor = () => {
    const hslToRgb = (h: number, s: number, l: number) => {
      s /= 100; l /= 100;
      const a = s * Math.min(l, 1 - l);
      const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color);
      };
      return [f(0), f(8), f(4)];
    };
    const [r, g, b] = hslToRgb(hue, saturation, 50 + (brightness - 50) * 0.5);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="cursor-crosshair rounded-full drop-shadow-lg"
          style={{ width: size, height: size }}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">BRILLO</label>
          <span className="text-xs font-mono text-sky-400">{brightness}%</span>
        </div>
        <div
          className="relative h-6 rounded-full overflow-hidden shadow-lg border border-gray-600"
          style={{
            background: `linear-gradient(to right, #000000, ${getSelectedColor()})`,
          }}
        >
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => onBrightnessChange(parseInt(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            style={{ WebkitAppearance: 'none' }}
          />
          <div
            className="absolute top-0 h-full w-1 bg-white rounded-sm shadow-lg pointer-events-none"
            style={{
              left: `calc(${brightness}% - 2px)`,
              boxShadow: '0 0 8px rgba(255,255,255,0.6)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
