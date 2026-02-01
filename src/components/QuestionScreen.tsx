import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { useState, useRef } from 'react';

interface QuestionScreenProps {
  onAccept: () => void;
}

export function QuestionScreen({ onAccept }: QuestionScreenProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const handleNoHover = () => {
    const moveDistance = 150;
    const directions = [
      { x: moveDistance, y: 0 },
      { x: -moveDistance, y: 0 },
      { x: 0, y: moveDistance },
      { x: 0, y: -moveDistance },
      { x: moveDistance, y: moveDistance },
      { x: -moveDistance, y: -moveDistance },
    ];
    
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    setNoPosition(randomDirection);
    setShowTooltip(true);
    
    setTimeout(() => setShowTooltip(false), 1500);
  };

  const handleYesClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Create heart burst effect
    const newHearts = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
    }));
    
    setHearts(newHearts);
    
    setTimeout(() => {
      onAccept();
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 p-4">
      {/* Glow particles */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 182, 193, 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main Card */}
      <motion.div
        className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 max-w-md w-full"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Breathing glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-200/50 to-rose-200/50 -z-10 blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Cute Heart Character */}
        <motion.div
          className="flex justify-center mb-8"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Heart className="w-20 h-20 text-pink-500 fill-pink-500" />
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            >
              <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Main Text */}
        <motion.h1
          className="text-4xl font-bold text-center text-gray-800 mb-12"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.span
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Will you be my Valentine?
          </motion.span>
        </motion.h1>

        {/* Buttons */}
        <div className="flex flex-col gap-6 items-center">
          {/* YES Button */}
          <motion.button
            onClick={handleYesClick}
            className="relative w-48 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg"
            whileHover={{
              scale: 1.1,
              boxShadow: '0 0 30px rgba(236, 72, 153, 0.6)',
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.span
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              💗 YES 💗
            </motion.span>
            
            {/* Button glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-pink-400"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.button>

          {/* NO Button (Dodging) */}
          <div className="relative">
            <motion.button
              ref={noButtonRef}
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              className="w-48 bg-gray-200 text-gray-600 font-semibold text-lg py-3 px-8 rounded-full shadow-md"
              animate={{
                x: noPosition.x,
                y: noPosition.y,
                rotate: [0, -5, 5, -5, 0],
              }}
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 20 },
                y: { type: 'spring', stiffness: 300, damping: 20 },
                rotate: { duration: 0.5, repeat: Infinity, repeatDelay: 2 },
              }}
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
              }}
            >
              😈 NO
            </motion.button>

            {/* Tooltip */}
            {showTooltip && (
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-500 whitespace-nowrap"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Nice try 😼
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Heart burst effect */}
      {hearts.map((heart, index) => (
        <motion.div
          key={heart.id}
          className="fixed pointer-events-none text-4xl"
          style={{
            left: heart.x,
            top: heart.y,
          }}
          initial={{
            opacity: 1,
            scale: 0,
          }}
          animate={{
            opacity: 0,
            scale: 1.5,
            x: Math.cos((index / hearts.length) * Math.PI * 2) * 150,
            y: Math.sin((index / hearts.length) * Math.PI * 2) * 150,
          }}
          transition={{
            duration: 1,
            ease: 'easeOut',
          }}
          onAnimationComplete={() => {
            setHearts((prev) => prev.filter((h) => h.id !== heart.id));
          }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
}
