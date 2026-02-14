import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import video1 from './assets/video1.mp4';
import video2 from './assets/vide2.mp4';
import video3 from './assets/video3.mp4';
import sound1 from './assets/movie_1.mp3';
import sound2 from './assets/ranil-hirunika.mp3';
import sound3 from './assets/ane-kata-wahapiya.mp3';
import sound4 from './assets/omg-bruh-oh-hell-nah.mp3';
import sound5 from './assets/chicken-on-tree-screaming.mp3';

function App() {
  const [showVideo, setShowVideo] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  // All 5 "No" sounds - will play randomly
  const noSounds = [sound2, sound3, sound4, sound5, sound2]; // Using 5 sounds

  // Audio refs for different sounds
  const perfectSongRef = useRef(null);
  const noSoundRefs = useRef([]);

  const videos = [video1, video2, video3];

  useEffect(() => {
    // Don't auto-play, wait for user interaction
  }, []);

  const handleYesClick = () => {
    // Stop all "No" sounds that might be playing
    // noSoundRefs.current.forEach((audioRef) => {
    //   if (audioRef) {
    //     audioRef.pause();
    //     audioRef.currentTime = 0;
    //   }
    // });

    setShowVideo(true);
    // Play romantic music
    // if (perfectSongRef.current) {
    //   perfectSongRef.current.play().catch(e => console.log("Audio play failed:", e));
    //   setAudioPlaying(true);
    // }
  };

  const handleNoClick = () => {
    // Select random sound from the 5 available
    const randomIndex = Math.floor(Math.random() * noSounds.length);
    
    // Stop all other sounds first
    noSoundRefs.current.forEach((audioRef, index) => {
      if (audioRef && index !== randomIndex) {
        audioRef.pause();
        audioRef.currentTime = 0;
      }
    });

    // Play the random sound effect
    if (noSoundRefs.current[randomIndex]) {
      noSoundRefs.current[randomIndex].currentTime = 0; // Rewind to start
      noSoundRefs.current[randomIndex].play().catch(e => console.log("No sound play failed:", e));
    }

    setShowAlert(true);
    // Auto-hide alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  };

  const toggleAudio = () => {
    if (perfectSongRef.current) {
      if (audioPlaying) {
        perfectSongRef.current.pause();
      } else {
        perfectSongRef.current.play();
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <div
      className="w-screen min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-rose-200 relative overflow-hidden flex items-center justify-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* Perfect by Ed Sheeran - plays when Yes is clicked */}
      <audio
        ref={perfectSongRef}
        loop
        src={sound1}
      />

      {/* All "No" Sound Effects - will be played randomly */}
      {noSounds.map((sound, index) => (
        <audio
          key={index}
          ref={(el) => (noSoundRefs.current[index] = el)}
          src={sound}
        />
      ))}

      {/* Audio Control Button (only show after Yes is clicked) */}
      {/* {showVideo && (
        <button
          onClick={toggleAudio}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 z-50 bg-white/40 backdrop-blur-sm text-pink-600 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-white/60 transition-all shadow-lg"
        >
          {audioPlaying ? '🔊' : '🔇'}
          <span className="hidden xs:inline">{audioPlaying ? ' Mute' : ' Play Music'}</span>
        </button>
      )} */}

      {/* Custom Pink Alert Modal */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ type: "spring", damping: 15 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] w-[90%] sm:w-auto"
          >
            <div className="bg-gradient-to-br from-pink-400 to-rose-400 border-4 border-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl text-center max-w-[280px] sm:max-w-sm mx-auto">
              <motion.div
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-3 md:mb-4"
              >
                💖
              </motion.div>
              <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 drop-shadow-md">
                That's not an option! 💔
              </h3>
              <p className="text-pink-50 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 px-2">
                Try again! The answer should be YES! 😊
              </p>
              <div className="w-12 sm:w-14 md:w-16 h-1 bg-white mx-auto rounded-full"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Falling 3D Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: -50,
              rotateX: 0,
              rotateY: 0,
              rotateZ: 0,
              scale: 0.2 + Math.random() * 0.5
            }}
            animate={{
              y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 50,
              rotateX: [0, 180, 360],
              rotateY: [0, 180, 360],
              rotateZ: [0, 360],
              x: `calc(${Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)}px + ${Math.sin(i) * 50}px)`
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            {/* 3D Heart with multiple layers for depth */}
            <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
              {/* Front heart */}
              <div className="absolute text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl" style={{
                transform: 'translateZ(8px)',
                filter: 'drop-shadow(0 8px 12px rgba(255,105,180,0.4))',
                textShadow: '1px 1px 0 rgba(255,255,255,0.5), 2px 2px 0 rgba(255,20,147,0.3)'
              }}>
                💗
              </div>
              {/* Middle layer */}
              <div className="absolute text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl" style={{
                transform: 'translateZ(4px)',
                filter: 'blur(1px)',
                opacity: 0.7
              }}>
                💕
              </div>
              {/* Back layer */}
              <div className="absolute text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl" style={{
                transform: 'translateZ(-4px)',
                filter: 'blur(2px)',
                opacity: 0.4
              }}>
                ❤️
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-3 sm:px-4 md:px-6">
        {!showVideo ? (
          <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
            {/* Question */}
            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-pink-600 mb-6 sm:mb-8 md:mb-10 lg:mb-12 drop-shadow-xl text-center px-2 leading-tight"
              style={{
                textShadow: '2px 2px 4px rgba(255,255,255,0.8), 4px 4px 6px rgba(255,105,180,0.3)'
              }}
            >
              Will you be my
              <span className="block xs:inline"> Valentine? </span>
            </motion.h1>

            {/* Buttons */}
            <div className="flex flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto px-2">
              {/* Yes Button - Beautiful Red/Pink Gradient */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYesClick}
                className="relative flex-1 bg-gradient-to-r from-red-400 via-red-400 to-pink-400 hover:from-red-500 hover:via-red-500 hover:to-pink-500 text-white font-bold py-3 xs:py-3.5 sm:py-4 md:py-5 px-4 xs:px-5 sm:px-6 md:px-8 rounded-full text-base xs:text-lg sm:text-xl md:text-2xl shadow-2xl transition-all duration-300 whitespace-nowrap border-2 border-white/30 overflow-hidden"
                style={{
                  boxShadow: '0 10px 30px rgba(239,68,68,0.5), 0 0 20px rgba(239,68,68,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <span className="relative z-10 drop-shadow-md">Yes</span>
              </motion.button>

              {/* No Button - Gray Gradient */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNoClick}
                className="relative flex-1 bg-gradient-to-r from-gray-400 via-gray-400 to-gray-400 hover:from-gray-500 hover:via-gray-500 hover:to-gray-600 text-white font-bold py-3 xs:py-3.5 sm:py-4 md:py-5 px-4 xs:px-5 sm:px-6 md:px-8 rounded-full text-base xs:text-lg sm:text-xl md:text-2xl shadow-2xl transition-all duration-300 whitespace-nowrap border-2 border-white/30 overflow-hidden"
                style={{
                  boxShadow: '0 10px 30px rgba(156,163,175,0.5), 0 0 20px rgba(156,163,175,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: 1.5,
                  }}
                />
                <span className="relative z-10 drop-shadow-md">No</span>
              </motion.button>
            </div>

            {/* Sparkles around buttons */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute text-yellow-300 text-xl"
                  style={{
                    left: '50%',
                    top: '60%',
                  }}
                  animate={{
                    x: [0, (i % 2 ? 100 : -100) * Math.cos(i * Math.PI / 3)],
                    y: [0, (i % 2 ? 100 : -100) * Math.sin(i * Math.PI / 3)],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut",
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          // Video Carousel Section
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center w-full max-w-6xl mx-auto py-2 sm:py-4"
          >
            <motion.h2
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-pink-600 mb-3 sm:mb-4 md:mb-5 lg:mb-6 font-bold drop-shadow-lg px-2"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Yay! You said Yes! 🎉
            </motion.h2>

            {/* Video Carousel */}
            <div className="relative bg-white/40 backdrop-blur-md rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl mx-1 xs:mx-2 border-2 border-white/50">
              <div className="relative flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                {/* Previous Button */}
                <button
                  onClick={prevVideo}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-pink-500 hover:bg-pink-600 text-white p-2 sm:p-3 md:p-4 rounded-full shadow-lg transition-all"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Videos Container */}
                <div className="flex gap-2 sm:gap-3 md:gap-4 overflow-hidden w-full justify-center px-8 sm:px-10 md:px-12 lg:px-16">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentVideoIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.15 }}
                      className="md:w-[25%] lg:w-[25%] sm:w-full max-w-md"
                    >
                      <video
                        className="w-full rounded-md xs:rounded-lg sm:rounded-xl shadow-2xl"
                        controls
                        playsInline
                        src={videos[currentVideoIndex]}
                      >
                        Your browser does not support the video tag.
                      </video>
                      <p className="text-pink-600 text-xs sm:text-sm md:text-base mt-2 font-semibold">
                        Video {currentVideoIndex + 1} of {videos.length}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Next Button */}
                <button
                  onClick={nextVideo}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-pink-500 hover:bg-pink-600 text-white p-2 sm:p-3 md:p-4 rounded-full shadow-lg transition-all"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Carousel Dots Indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${index === currentVideoIndex
                      ? 'bg-pink-600 w-6 sm:w-8'
                      : 'bg-pink-300 hover:bg-pink-400'
                      }`}
                  />
                ))}
              </div>

              <p className="text-pink-600 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mt-3 sm:mt-4 md:mt-5 lg:mt-6 font-semibold">
                Happy Valentine's Day! ❤️
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Decorative floating pastel circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full bg-pink-200/30"
            style={{
              width: `calc(100px + ${i * 80}px)`,
              height: `calc(100px + ${i * 80}px)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              x: [0, 40, -40, 0],
              y: [0, -40, 40, 0],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;