import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface FallingHeart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export function SuccessScreen() {
  const [fallingHearts, setFallingHearts] = useState<FallingHeart[]>([]);

  useEffect(() => {
    const newHearts: FallingHeart[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
      size: 20 + Math.random() * 25,
      rotation: Math.random() * 360,
    }));
    setFallingHearts(newHearts);
  }, []);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-100 to-red-100 p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Heart rain */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {fallingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-400/60"
            style={{
              left: `${heart.left}%`,
              top: -50,
              fontSize: `${heart.size}px`,
            }}
            animate={{
              y: [0, window.innerHeight + 100],
              x: [0, Math.sin(heart.id) * 30],
              rotate: [heart.rotation, heart.rotation + 360],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Glowing particles */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(255, 182, 193, 0.4) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 50%, rgba(255, 182, 193, 0.4) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 50%, rgba(255, 182, 193, 0.4) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main Content Card */}
      <motion.div
        className="relative z-10 text-center max-w-2xl"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          duration: 1,
        }}
      >
        {/* Animated envelope/heart icon */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
        >
          <motion.div
            className="relative"
            animate={{
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="relative">
              <Heart className="w-32 h-32 text-rose-500 fill-rose-500" />
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              >
                <Heart className="w-32 h-32 text-rose-300 fill-rose-300" />
              </motion.div>
            </div>

            {/* Sparkles around heart */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: [0, Math.cos((i / 4) * Math.PI * 2) * 60],
                  y: [0, Math.sin((i / 4) * Math.PI * 2) * 60],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeOut',
                }}
              >
                <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Message */}
        <motion.div
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 2,
            }}
          />

          {/* Glowing pulse behind text */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-3xl -z-10"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.h1
            className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.span
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              You just made my heart the happiest 💖
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-700 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            Our date is officially confirmed — I can't wait to see you.
          </motion.p>

          {/* Decorative hearts */}
          <div className="flex justify-center gap-4 mt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              >
                <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating love particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${(i * 12.5) + 10}%`,
              top: '50%',
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeOut',
            }}
          >
            {['💕', '💖', '💗', '💘'][i % 4]}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
