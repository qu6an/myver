import React, { useEffect, useState } from 'react';

interface AnimatedProgressBarProps {
  progress: number;
  maxProgress?: number;
  color?: string;
  height?: string;
  className?: string;
  label?: string;
  showPercentage?: boolean;
}

const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  progress,
  maxProgress = 100,
  color = 'indigo',
  height = 'h-1.5',
  className = '',
  label = '',
  showPercentage = true,
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    // Анимация заполнения прогресс-бара
    const timer = setTimeout(() => {
      setCurrentProgress(progress);
    }, 100);

    return () => clearTimeout(timer);
  }, [progress]);

  const progressPercentage = Math.min(100, Math.max(0, (currentProgress / maxProgress) * 100));
  const colorClass = `bg-${color}-500`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between mb-1.5 text-sm text-gray-600">
          <span>{label}</span>
          {showPercentage && <span>{Math.round(progress)}%</span>}
        </div>
      )}
      <div className={`${height} bg-gray-200 rounded-full overflow-hidden`}>
        <div 
          className={`progress-fill h-full rounded-full ${colorClass} transition-all duration-1000 ease-out`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AnimatedProgressBar;