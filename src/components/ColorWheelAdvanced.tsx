import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LanguageContext';

interface ColorWheelAdvancedProps {
  hue: number;
  brightness: number;
  saturation: number;
  triadMode: boolean;
  onHueChange: (hue: number) => void;
  onSaturationChange: (saturation: number) => void;
  onBrightnessChange: (brightness: number) => void;
}

export default function ColorWheelAdvanced({
  hue,
  brightness,
  saturation,
  triadMode,
  onHueChange,
  onSaturationChange,
  onBrightnessChange,
}: ColorWheelAdvancedProps) {
  const { t } = useLang();
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

    // Draw HSV color wheel: angle = hue, distance from center = saturation
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

        // HSV to RGB: full brightness at the wheel
        const hsvToRgbPixel = (h: number, s: number, v: number) => {
          s /= 100; v /= 100;
          const c = v * s;
          const xVal = c * (1 - Math.abs(((h / 60) % 2) - 1));
          const m = v - c;
          let r = 0, g = 0, b = 0;
          if (h < 60) { r = c; g = xVal; }
          else if (h < 120) { r = xVal; g = c; }
          else if (h < 180) { g = c; b = xVal; }
          else if (h < 240) { g = xVal; b = c; }
          else if (h < 300) { r = xVal; b = c; }
          else { r = c; b = xVal; }
          return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
        };

        const [r, g, b] = hsvToRgbPixel(angle, sat, brightness);
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

    // Calculate marker position: angle = hue, distance = saturation
    const markerDist = (saturation / 100) * radius;

    const drawMarker = (markerHue: number, isPrimary: boolean) => {
      const angleRad = (markerHue / 360) * Math.PI * 2 - Math.PI / 2;
      const px = centerX + Math.cos(angleRad) * markerDist;
      const py = centerY + Math.sin(angleRad) * markerDist;
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

      // Hue-colored inner border
      ctx.beginPath();
      ctx.arc(px, py, markerSize, 0, Math.PI * 2);
      ctx.strokeStyle = `hsl(${markerHue}, 100%, 50%)`;
      ctx.lineWidth = isPrimary ? 1.5 : 1;
      ctx.stroke();

      // Inner dot for secondary markers
      if (!isPrimary) {
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${markerHue}, 100%, 70%)`;
        ctx.fill();
      }
    };

    // Draw triad connecting lines behind markers
    if (triadMode) {
      const triadHues = [hue, (hue + 120) % 360, (hue + 240) % 360];
      const points = triadHues.map(h => {
        const a = (h / 360) * Math.PI * 2 - Math.PI / 2;
        return {
          x: centerX + Math.cos(a) * markerDist,
          y: centerY + Math.sin(a) * markerDist,
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

    // Draw markers
    if (triadMode) {
      drawMarker((hue + 240) % 360, false);
      drawMarker((hue + 120) % 360, false);
      drawMarker(hue, true);
    } else {
      drawMarker(hue, true);
    }
  }, [hue, brightness, saturation, triadMode]);

  const handleCanvasInteraction = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = size / rect.width;
    const scaleY = size / rect.height;
    const x = (e.clientX - rect.left) * scaleX - size / 2;
    const y = (e.clientY - rect.top) * scaleY - size / 2;

    const radius = size / 2 - 8;
    const dist = Math.sqrt(x * x + y * y);

    // Calculate hue from angle
    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    const newHue = Math.round(angle) % 360;

    // Calculate saturation from distance (center = 0%, edge = 100%)
    const newSat = Math.round(Math.min((dist / radius) * 100, 100));

    onHueChange(newHue);
    onSaturationChange(newSat);
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
    const hsvToRgbLocal = (h: number, s: number, v: number) => {
      s /= 100; v /= 100;
      const c = v * s;
      const xVal = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = v - c;
      let r = 0, g = 0, b = 0;
      if (h < 60) { r = c; g = xVal; }
      else if (h < 120) { r = xVal; g = c; }
      else if (h < 180) { g = c; b = xVal; }
      else if (h < 240) { g = xVal; b = c; }
      else if (h < 300) { r = xVal; b = c; }
      else { r = c; b = xVal; }
      return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
    };
    const [r, g, b] = hsvToRgbLocal(hue, saturation, brightness);
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
          <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">{t('brightness').toUpperCase()}</label>
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
