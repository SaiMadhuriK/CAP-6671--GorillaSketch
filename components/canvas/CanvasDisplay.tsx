"use client";

import { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { CanvasData } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CanvasDisplayProps {
  data?: CanvasData[];
  isLoading: boolean;
  className?: string;
}

export function CanvasDisplay({ data, isLoading, className }: CanvasDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render each item
    data.forEach(item => {
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      switch (item.type) {
        case 'shape':
          const borderColor = item.style?.borderColor ? item.style.borderColor : null;
          const borderWidth = item.style?.borderWidth || 2;
          ctx.lineWidth = borderWidth;

          if (item.content === 'circle') {
            const radius = (item.dimensions?.width || 300) / 2; // Increased size
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fillStyle = item.style?.fill || '#000';
            ctx.fill();

            if (borderColor) {
              ctx.strokeStyle = borderColor; // Apply border only if specified
              ctx.stroke();
            }

            // Add text inside the circle
            if (item.text) {
              ctx.fillStyle = item.style?.textColor || '#FFF';
              ctx.font = `${item.style?.fontStyle || 'normal'} ${item.style?.font || '24px Inter'}`; // Larger font
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(item.text, centerX, centerY);
            }
          } else if (item.content === 'triangle') {
            const width = item.dimensions?.width || 600; // Increased size
            const height = item.dimensions?.height || 1200; // Increased size

            ctx.beginPath();
            ctx.moveTo(centerX, centerY - height / 2);
            ctx.lineTo(centerX - width / 2, centerY + height / 2);
            ctx.lineTo(centerX + width / 2, centerY + height / 2);
            ctx.closePath();
            ctx.fillStyle = item.style?.fill || '#000';
            ctx.fill();

            if (borderColor) {
              ctx.strokeStyle = borderColor; // Apply border only if specified
              ctx.stroke();
            }

            // Add text inside the triangle
            if (item.text) {
              ctx.fillStyle = item.style?.textColor || '#FFF';
              ctx.font = `${item.style?.fontStyle || 'normal'} ${item.style?.font || '24px Inter'}`; // Larger font
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';

              const textX = centerX;
              const textY = centerY;

              ctx.fillText(item.text, textX, textY);
            }
          } else if (item.content === 'rectangle' || item.content === 'square') {
            const width = item.content === 'square' ? (item.dimensions?.width || 300) : (item.dimensions?.width || 600); // Increased size
            const height = item.content === 'square' ? width : (item.dimensions?.height || 900); // Increased size

            const rectX = centerX - width / 2;
            const rectY = centerY - height / 2;

            ctx.fillStyle = item.style?.fill || '#000';
            ctx.fillRect(rectX, rectY, width, height);

            if (borderColor) {
              ctx.strokeStyle = borderColor; // Apply border only if specified
              ctx.strokeRect(rectX, rectY, width, height);
            }

            // Add text inside the rectangle/square
            if (item.text) {
              ctx.fillStyle = item.style?.textColor || '#FFF';
              ctx.font = `${item.style?.fontStyle || 'normal'} ${item.style?.font || '24px Inter'}`; // Larger font
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';

              const textX = centerX;
              const textY = centerY;

              ctx.fillText(item.text, textX, textY);
            }
          } else if (item.content === 'pentagon') {
            const size = item.dimensions?.width || 300; // Increased size
            const angle = (2 * Math.PI) / 5;

            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
              const x = centerX + size * Math.cos(i * angle - Math.PI / 2);
              const y = centerY + size * Math.sin(i * angle - Math.PI / 2);
              i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fillStyle = item.style?.fill || '#000';
            ctx.fill();

            if (borderColor) {
              ctx.strokeStyle = borderColor; // Apply border only if specified
              ctx.stroke();
            }

            // Add text inside the pentagon
            if (item.text) {
              ctx.fillStyle = item.style?.textColor || '#FFF';
              ctx.font = `${item.style?.fontStyle || 'normal'} ${item.style?.font || '24px Inter'}`; // Larger font
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';

              ctx.fillText(item.text, centerX, centerY);
            }
          }else if (item.content === 'hexagon') {
            const size = item.dimensions?.width || 300; // Size of the hexagon
            const angle = (2 * Math.PI) / 6; // 360 degrees divided by 6 sides
        
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const x = centerX + size * Math.cos(i * angle - Math.PI / 2);
                const y = centerY + size * Math.sin(i * angle - Math.PI / 2);
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fillStyle = item.style?.fill || '#000';
            ctx.fill();
        
            if (borderColor) {
                ctx.strokeStyle = borderColor; // Apply border only if specified
                ctx.stroke();
            }
        
            // Add text inside the hexagon
            if (item.text) {
                ctx.fillStyle = item.style?.textColor || '#FFF';
                ctx.font = `${item.style?.fontStyle || 'normal'} ${item.style?.font || '24px Inter'}`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
        
                ctx.fillText(item.text, centerX, centerY);
            }
        } else if (item.content === 'heptagon') {
          const size = item.dimensions?.width || 300; // Size of the heptagon
          const angle = (2 * Math.PI) / 7; // 360 degrees divided by 7 sides
      
          ctx.beginPath();
          for (let i = 0; i < 7; i++) {
              const x = centerX + size * Math.cos(i * angle - Math.PI / 2);
              const y = centerY + size * Math.sin(i * angle - Math.PI / 2);
              i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fillStyle = item.style?.fill || '#000';
          ctx.fill();
      
          if (borderColor) {
              ctx.strokeStyle = borderColor; // Apply border only if specified
              ctx.stroke();
          }
      
          // Add text inside the heptagon
          if (item.text) {
              ctx.fillStyle = item.style?.textColor || '#FFF';
              ctx.font = `${item.style?.fontStyle || 'normal'} ${item.style?.font || '24px Inter'}`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
      
              ctx.fillText(item.text, centerX, centerY);
          }
      }   else if (item.content === 'oval') {
        const width = item.dimensions?.width || 300; // Width of the oval
        const height = item.dimensions?.height || 150; // Height of the oval
    
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, width / 2, height / 2, 0, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = item.style?.fill || '#000';
        ctx.fill();
    
        if (borderColor) {
            ctx.strokeStyle = borderColor; // Apply border only if specified
            ctx.stroke();
        }
    
        // Add text inside the oval
        if (item.text) {
            ctx.fillStyle = item.style?.textColor || '#FFF';
            ctx.font = `${item.style?.fontStyle || 'normal'} ${item.style?.font || '24px Inter'}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
    
            ctx.fillText(item.text, centerX, centerY);
        }
    }   else if (item.content === 'star') {
      const outerRadius = item.dimensions?.width || 300; // Outer radius of the star
      const innerRadius = outerRadius / 2; // Inner radius for star points
      const numPoints = 5; // Number of points in the star
      const angle = Math.PI / numPoints; // Angle between points
  
      ctx.beginPath();
      for (let i = 0; i < 2 * numPoints; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const x = centerX + radius * Math.cos(i * angle - Math.PI / 2);
          const y = centerY + radius * Math.sin(i * angle - Math.PI / 2);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = item.style?.fill || '#000';
      ctx.fill();
  
      if (borderColor) {
          ctx.strokeStyle = borderColor; // Apply border only if specified
          ctx.stroke();
      }
  
      // Add text inside the star
      if (item.text) {
          ctx.fillStyle = item.style?.textColor || '#FFF';
          ctx.font = `${item.style?.fontStyle || 'normal'} ${item.style?.font || '24px Inter'}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
  
          ctx.fillText(item.text, centerX, centerY);
      }
  }   else if (item.content === 'cylinder') {
            const width = item.dimensions?.width || 300; // Increased size
            const height = item.dimensions?.height || 450; // Increased size

            const cylinderX = centerX - width / 2;
            const cylinderY = centerY - height / 2;

            // Draw cylinder body
            ctx.fillStyle = item.style?.fill || '#000';
            ctx.fillRect(cylinderX, cylinderY, width, height);

            if (borderColor) {
              ctx.strokeStyle = borderColor; // Apply border only if specified
              ctx.strokeRect(cylinderX, cylinderY, width, height);
            }

            // Draw cylinder top
            ctx.beginPath();
            ctx.ellipse(centerX, cylinderY, width / 2, width / 4, 0, 0, 2 * Math.PI);
            ctx.fill();

            if (borderColor) {
              ctx.strokeStyle = borderColor; // Apply border only if specified
              ctx.stroke();
            }

            // Draw cylinder bottom
            ctx.beginPath();
            ctx.ellipse(centerX, cylinderY + height, width / 2, width / 4, 0, 0, Math.PI);
            ctx.fill();

            if (borderColor) {
              ctx.strokeStyle = borderColor; // Apply border only if specified
              ctx.stroke();
            }

            // Add text inside the cylinder
            if (item.text) {
              ctx.fillStyle = item.style?.textColor || '#FFF';
              ctx.font = `${item.style?.fontStyle || 'normal'} ${item.style?.font || '24px Inter'}`; // Larger font
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';

              ctx.fillText(item.text, centerX, centerY);
            }
          }
          break;
        case 'text':
          ctx.font = `${item.style?.fontStyle || 'normal'} ${item.style?.font || '24px Inter'}`; // Larger font
          ctx.fillStyle = item.style?.fill || '#000';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(item.content, centerX, centerY);
          break;
      }
    });
  }, [data]);

  return (
    <Card className={cn(
      "w-full aspect-video bg-card/50 backdrop-blur-sm border-2 relative overflow-hidden",
      isLoading ? "border-primary" : "border-muted",
      className
    )}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        width={800}
        height={600}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Processing prompt...</p>
          </div>
        </div>
      )}
    </Card>
  );
}




