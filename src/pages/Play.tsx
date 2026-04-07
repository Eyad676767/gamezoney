import { useEffect, useRef, useState } from 'react';
import { Play as PlayIcon, RotateCcw, Trophy, MousePointer2, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_GAMES } from '../constants';
import { useSettings } from '../context/SettingsContext';

export default function Play({ gameId }: { gameId: string | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { settings } = useSettings();

  const currentGame = MOCK_GAMES.find(g => g.id === gameId) || MOCK_GAMES[0];

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frameCount = 0;

    // Runner State
    let player = { x: 50, y: canvas.height / 2, size: 30 };
    let obstacles: { x: number, y: number, width: number, height: number }[] = [];

    // Collector State
    let collector = { x: canvas.width / 2, y: canvas.height / 2, size: 40 };
    let items: { x: number, y: number, size: number, color: string }[] = [];

    const spawnObstacle = () => {
      const height = Math.random() * (canvas.height - 100) + 50;
      obstacles.push({
        x: canvas.width,
        y: Math.random() > 0.5 ? 0 : canvas.height - height,
        width: 40,
        height: height
      });
    };

    const spawnItem = () => {
      items.push({
        x: Math.random() * (canvas.width - 40) + 20,
        y: Math.random() * (canvas.height - 40) + 20,
        size: 15,
        color: '#f97316'
      });
    };

    const update = () => {
      frameCount++;

      if (currentGame.gameType === 'runner') {
        const spawnRate = settings.highQuality ? 45 : 60;
        if (frameCount % spawnRate === 0) {
          spawnObstacle();
          setScore(s => s + 1);
        }
        obstacles.forEach(obs => { obs.x -= 5; });
        obstacles = obstacles.filter(obs => obs.x + obs.width > 0);

        for (const obs of obstacles) {
          if (
            player.x < obs.x + obs.width &&
            player.x + player.size > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.size > obs.y
          ) {
            setGameOver(true);
            setIsPlaying(false);
            if (score > highScore) setHighScore(score);
          }
        }
      } else if (currentGame.gameType === 'collector') {
        const spawnRate = settings.highQuality ? 45 : 60;
        if (frameCount % spawnRate === 0) {
          spawnItem();
        }
        
        items = items.filter(item => {
          const dx = collector.x - item.x;
          const dy = collector.y - item.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < collector.size / 2 + item.size) {
            setScore(s => s + 10);
            return false;
          }
          return true;
        });

        if (frameCount > 1800) { 
          setGameOver(true);
          setIsPlaying(false);
          if (score > highScore) setHighScore(score);
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (currentGame.gameType === 'runner') {
        ctx.fillStyle = '#f97316';
        if (settings.highQuality) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#f97316';
        }
        ctx.fillRect(player.x, player.y, player.size, player.size);

        ctx.fillStyle = '#ffffff';
        if (settings.highQuality) {
          ctx.shadowBlur = 5;
          ctx.shadowColor = '#ffffff';
        }
        obstacles.forEach(obs => {
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        });
      } else if (currentGame.gameType === 'collector') {
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.arc(collector.x, collector.y, collector.size / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        items.forEach(item => {
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (currentGame.gameType === 'clicker') {
        ctx.fillStyle = 'rgba(249, 115, 22, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Reset shadow for next frame
      ctx.shadowBlur = 0;
    };

    const loop = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      if (currentGame.gameType === 'runner') {
        player.y = Math.max(0, Math.min(canvas.height - player.size, mouseY - player.size / 2));
      } else if (currentGame.gameType === 'collector') {
        collector.x = Math.max(0, Math.min(canvas.width, mouseX));
        collector.y = Math.max(0, Math.min(canvas.height, mouseY));
      }
    };

    const handleClick = () => {
      if (currentGame.gameType === 'clicker') {
        setScore(s => s + 1);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [isPlaying, gameOver, currentGame.gameType, settings.highQuality]);

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const getInstructions = () => {
    switch (currentGame.gameType) {
      case 'runner': return 'Move mouse to avoid white blocks';
      case 'collector': return 'Move mouse to collect white orbs';
      case 'clicker': return 'Click anywhere on the canvas to score';
      default: return '';
    }
  };

  const getIcon = () => {
    switch (currentGame.gameType) {
      case 'runner': return <PlayIcon className="w-8 h-8 fill-current" />;
      case 'collector': return <Target className="w-8 h-8" />;
      case 'clicker': return <MousePointer2 className="w-8 h-8" />;
      default: return <PlayIcon className="w-8 h-8 fill-current" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">{currentGame.title}</h2>
        <p className="text-orange-500/60 font-mono">{getInstructions()}</p>
      </div>

      <div className="relative group">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="bg-zinc-900 border-2 border-orange-500/30 rounded-2xl shadow-[0_0_50px_rgba(249,115,22,0.1)] cursor-crosshair"
        />

        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-2xl">
            {gameOver ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <Trophy className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h3 className="text-5xl font-black text-white mb-2">GAME OVER</h3>
                <p className="text-orange-500 text-2xl font-mono mb-8">FINAL SCORE: {score}</p>
                <button
                  onClick={startGame}
                  className="bg-orange-500 hover:bg-orange-600 text-black px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all mx-auto"
                >
                  <RotateCcw className="w-6 h-6" /> Try Again
                </button>
              </motion.div>
            ) : (
              <button
                onClick={startGame}
                className="bg-orange-500 hover:bg-orange-600 text-black px-12 py-6 rounded-2xl font-black text-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(249,115,22,0.4)]"
              >
                {getIcon()} START {currentGame.gameType.toUpperCase()}
              </button>
            )}
          </div>
        )}

        <div className="absolute top-4 left-4 flex gap-8">
          <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-orange-500/20">
            <div className="text-[10px] text-orange-500 uppercase font-bold">Score</div>
            <div className="text-xl font-mono text-white">{score}</div>
          </div>
          <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-orange-500/20">
            <div className="text-[10px] text-orange-500 uppercase font-bold">High Score</div>
            <div className="text-xl font-mono text-white">{highScore}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
