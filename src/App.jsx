import { useState, useEffect, useRef } from 'react';

// Import your assets here
import flowers from './assets/tulip4.png';
import photo1 from './assets/picture1.jpg'; // Replace with your actual photo paths
import photo2 from './assets/picture2.jpg';
import photo3 from './assets/picture3.jpg';
import musicFile from './assets/music.mp3';

function App() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const [tulipGarden, setTulipGarden] = useState([]);
  const [gameScore, setGameScore] = useState(0);
  const [cursorTulips, setCursorTulips] = useState([]);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const audioRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const messages = [
    "Hello, I know this is very cringe, but I hope it will be helpful to your situation right now, kay nabantayan nako these past days nga you need some help, and I think this might be helpful.",
    "As you can see, there are 3 pics and syempre we're so cute HAHA like ang chiks dagko pa. And yes, that's you and me trying to do whatever is best for us in the future. If you feel down, just reflect on your old self nga bisan karon grabe pa ang struggle or challenge your old self will be proud kay you're doing great and making progress.",
    "And also, if you need some help, I'm right here and willing to help you in acads or anything. I just did this because lately you wanted some flowers, so that's why I made this website HAHA. I know this is cringe, but I hope this makes you smile a little bit even thu there not real flowers. (These are your favorite 'tulips')",
    "I hope you will not overwork yourself because we're just human we breath, we rest, and grind again, importante jud ang rest espcially quizzes and exams ",
    "I will tell you some story lately sa akong Midterm like struggle is real jud para nako wakoy tug sig himo project and exam sad to namo so nabuntagan nako i was trying to clutch those lesson and study so mao to libog na kaayo akong ulo wako ka passing sa midterm exam but thankfully dako rakog grades so leeson learn need jud ang rest",
    "But, Plot Twist HAHA after sa midterm exam nihilak jud ko kay kaybaw naman ko nga sayup to nako like solve2 siya niya mao to is sakto ang solving but .1 ra ang kuwang maong wrong na tanan HAHA maong blame jud kaayo to sakit sa akong part sa kakapoi, kagoul, and blame sakong self and I know ma abot sad ka ana nga time (I think HAHA) ni adto ko sa simbahan and nangayo kog tabang ni lord ato kay siya rasad akong madoulan ato ",
    "So, ni adto ko ni dagkot and I hate it kay nidoul rako ni lord nga naay geh hangyo and adto nihilak sad ko HAHA kay wanajud koy laing madoulan ato and mao to mga 14 hours man siguro tug nako ato and then we have another exam but different subject na siya so i study that subject and then naka passing rajud and now I know nga unsa ka important ang rest",
    "It's because mapahuway man gud ang imong brain and according to study theory rani ha HAHA 30 mins. study and 30 mins. break is effective daw so i hope imo siyang eh apply, So yeah, I hope you learned sa akong gipang ingon hehe and help you",
    "So the lesson for this message is, I hope you will apply acceptance. If you feel burdened with your course and everything is lisud jud, just try to enjoy and love your course. For me right now, I'm doing great and I'm proud of it. Katong first year nako, nag-lisud pasad ko and ganahan ko mo-balhin og school, but right now ako siyang na-apply, giganahan rasad ko",
    "Lastly, This website is for you jud ni like ganahan ko makatabang nimo, kay kabantay sad ko sa imong mga gipang rant HAHA gasubay rako so just call me or chat me lang ha Thankyouu...💕",
  ];
const handlePhotoClick = (photoSrc, photoIndex) => {
  setSelectedPhoto({ src: photoSrc, index: photoIndex });
  setShowModal(true);
};


  // Tulip cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (Math.random() < 0.1) { // 10% chance to spawn tulip
        const newTulip = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          size: Math.random() * 20 + 15
        };
        setCursorTulips(prev => [...prev.slice(-20), newTulip]); // Keep only last 20
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate cursor tulips
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTulips(prev => 
        prev.map(tulip => ({
          ...tulip,
          opacity: tulip.opacity - 0.05,
          y: tulip.y - 2
        })).filter(tulip => tulip.opacity > 0)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Floating hearts animation
  useEffect(() => {
    const heartInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        const newHeart = {
          id: Date.now() + Math.random(),
          x: Math.random() * window.innerWidth,
          y: window.innerHeight,
          opacity: 1,
          drift: Math.random() * 4 - 2
        };
        setFloatingHearts(prev => [...prev.slice(-15), newHeart]);
      }
    }, 2000);

    return () => clearInterval(heartInterval);
  }, []);

  // Animate floating hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingHearts(prev => 
        prev.map(heart => ({
          ...heart,
          y: heart.y - 3,
          x: heart.x + heart.drift,
          opacity: heart.y < 100 ? heart.opacity - 0.02 : heart.opacity
        })).filter(heart => heart.y > -50 && heart.opacity > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Click-to-grow tulip game
  const handleGardenClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newTulip = {
      id: Date.now(),
      x: x,
      y: y,
      stage: 0,
      color: ['🌱', '🌿', '🌹', '🌷', '🌺'][0]
    };
    
    setTulipGarden(prev => [...prev, newTulip]);
    setGameScore(prev => prev + 1);
  };

  const growTulip = (tulipId) => {
    setTulipGarden(prev => 
      prev.map(tulip => {
        if (tulip.id === tulipId && tulip.stage < 4) {
          const colors = ['🌱', '🌿', '🌹', '🌷', '🌺'];
          return {
            ...tulip,
            stage: tulip.stage + 1,
            color: colors[tulip.stage + 1]
          };
        }
        return tulip;
      })
    );
    setGameScore(prev => prev + 5);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 500);
    return () => clearTimeout(timer);
  }, [currentMessage]);

  // Auto-play music immediately when component loads
  useEffect(() => {
    const playMusicImmediately = async () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.muted = false; // Ensure not muted
        
        try {
          // Try to play immediately
          await audioRef.current.play();
          setMusicPlaying(true);
          setUserInteracted(true);
        } catch (error) {
          // If autoplay fails, try with a slight delay
          setTimeout(async () => {
            try {
              await audioRef.current.play();
              setMusicPlaying(true);
              setUserInteracted(true);
            } catch (retryError) {
              console.log('Autoplay blocked by browser, waiting for user interaction');
              // Fallback to user interaction
              const handleInteraction = async () => {
                try {
                  await audioRef.current.play();
                  setMusicPlaying(true);
                  setUserInteracted(true);
                } catch (e) {
                  console.log('Play failed:', e);
                }
              };
              
              document.addEventListener('click', handleInteraction, { once: true });
              document.addEventListener('touchstart', handleInteraction, { once: true });
            }
          }, 100);
        }
      }
    };

    // Start music immediately
    const timer = setTimeout(playMusicImmediately, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const playMusic = async () => {
    if (!audioRef.current) return;
    
    try {
      // Reset audio to beginning if needed
      if (audioRef.current.ended) {
        audioRef.current.currentTime = 0;
      }
      
      audioRef.current.volume = 0.3;
      await audioRef.current.play();
      setMusicPlaying(true);
    } catch (error) {
      console.log('Music playback error:', error);
      // Fallback: try again after a short delay
      setTimeout(async () => {
        try {
          await audioRef.current.play();
          setMusicPlaying(true);
        } catch (retryError) {
          console.log('Music retry failed:', retryError);
        }
      }, 1000);
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      await playMusic();
    }
  };

  const nextMessage = () => {
    setShowMessage(false);
    setTimeout(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 300);
  };

  const prevMessage = () => {
    setShowMessage(false);
    setTimeout(() => {
      setCurrentMessage((prev) => (prev - 1 + messages.length) % messages.length);
    }, 300);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-2 sm:p-4 lg:p-6 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${flowers})`,
        cursor: 'none'
      }}
    >
      {/* Custom Cursor Tulips */}
      {cursorTulips.map(tulip => (
        <div
          key={tulip.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: tulip.x - tulip.size/2,
            top: tulip.y - tulip.size/2,
            opacity: tulip.opacity,
            fontSize: `${tulip.size}px`,
            transform: `scale(${tulip.opacity})`,
            transition: 'all 0.1s ease'
          }}
        >
          🌷
        </div>
      ))}

      {/* Floating Hearts */}
      {floatingHearts.map(heart => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-40 text-2xl animate-pulse"
          style={{
            left: heart.x,
            top: heart.y,
            opacity: heart.opacity,
            transform: `scale(${heart.opacity})`
          }}
        >
          💕
        </div>
      ))}

      {/* Background Audio with enhanced compatibility */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        autoPlay
        playsInline
        muted={false}
        onLoadedData={() => console.log('Audio loaded successfully')}
        onCanPlayThrough={() => {
          console.log('Audio ready to play');
          // Try to play when ready
          if (audioRef.current && !musicPlaying) {
            audioRef.current.play().catch(e => console.log('Auto-play blocked:', e));
          }
        }}
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
        onError={(e) => console.log('Audio error:', e.target.error)}
      >
        <source src={musicFile} type="audio/mpeg" />
        <source src={musicFile} type="audio/mp3" />
        <source src={musicFile} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

      {/* Control Buttons */}
      <div className="fixed top-4 right-4 z-10 flex gap-2">
        <button
          onClick={toggleMusic}
          className="bg-pink-500/80 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-pink-600/80 transform hover:scale-110 transition-all duration-200 border border-pink-300/30"
          aria-label={musicPlaying ? 'Pause music' : 'Play music'}
          style={{ cursor: 'pointer' }}
        >
          {musicPlaying ? '🔊' : '🔇'}
        </button>
        
        <button
          onClick={() => setShowGames(!showGames)}
          className="bg-green-500/80 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-green-600/80 transform hover:scale-110 transition-all duration-200 border border-green-300/30"
          aria-label="Toggle games"
          style={{ cursor: 'pointer' }}
        >
          🎮
        </button>
      </div>

      {/* Game Panel */}
      {showGames && (
        <div className="fixed top-20 right-4 z-10 bg-white/20 backdrop-blur-lg p-4 rounded-2xl border border-white/30 shadow-2xl w-80 max-h-96 overflow-y-auto">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-white mb-2">🌷 Tulip Garden Game 🌷</h3>
            <p className="text-sm text-white/80 mb-2">Score: {gameScore}</p>
            <p className="text-xs text-white/70">Click to plant seeds, then click tulips to grow them!</p>
          </div>
          
          {/* Game Area */}
          <div 
            className="relative bg-green-100/20 backdrop-blur-sm rounded-xl h-48 border-2 border-dashed border-white/40 overflow-hidden"
            onClick={handleGardenClick}
            style={{ cursor: 'crosshair' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-sky-200/20 to-green-200/20"></div>
            
            {tulipGarden.map(tulip => (
              <div
                key={tulip.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 text-2xl hover:scale-125 transition-all duration-300 animate-bounce cursor-pointer"
                style={{ 
                  left: `${tulip.x}%`, 
                  top: `${tulip.y}%`,
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  growTulip(tulip.id);
                }}
              >
                {tulip.color}
              </div>
            ))}
            
            {tulipGarden.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
                Click anywhere to start planting! 🌱
              </div>
            )}
          </div>
          
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                setTulipGarden([]);
                setGameScore(0);
              }}
              className="flex-1 bg-red-500/80 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600/80 transition-colors"
              style={{ cursor: 'pointer' }}
            >
              Clear Garden
            </button>
            <button
              onClick={() => setShowGames(false)}
              className="flex-1 bg-gray-500/80 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-600/80 transition-colors"
              style={{ cursor: 'pointer' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-3xl xl:max-w-4xl mx-2">
        {/* Envelope Container */}
        <div className="relative bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 mx-2"
             style={{
               clipPath: 'polygon(0 20%, 50% 0, 100% 20%, 100% 100%, 0 100%)',
               borderRadius: '0 0 20px 20px'
             }}>
          
          {/* Envelope Flap */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-white/15 backdrop-blur-lg border-b border-white/20"
               style={{
                 clipPath: 'polygon(0 0, 50% 80%, 100% 0)',
                 zIndex: 10
               }}>
            {/* Envelope Seal */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-sm">💕</span>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="pt-24 pb-6 px-4 sm:px-6 lg:px-8">
        {/* Header with decorative elements */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <div className="flex justify-center items-center mb-3 sm:mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl font-serif px-2 text-center leading-tight">
              Hello, Tricia
            </h1>
          </div>
          <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-32 h-1 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 mx-auto rounded-full shadow-lg"></div>
        </div>

        {/* Photo Frames Section - Enhanced Responsive */}
        <div className="flex justify-center gap-2 sm:gap-4 lg:gap-6 xl:gap-8 mb-6 sm:mb-8 lg:mb-10 flex-wrap">
          {/* Photo Frame 1 */}
          <div className="relative group flex-shrink-0">
            <div className="w-16 h-20 sm:w-24 sm:h-28 md:w-32 md:h-36 lg:w-40 lg:h-44 xl:w-48 xl:h-52 rounded-2xl border-4 border-white/40 bg-white/90 p-1 shadow-2xl transform rotate-3 group-hover:rotate-0 transition-all duration-500 hover:scale-105 backdrop-blur-sm">
              <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-pink-50 to-rose-100 cursor-pointer" onClick={() => handlePhotoClick(photo1, 1)}>
                <img 
                  src={photo1} 
                  alt="Memory 1" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center text-pink-500 text-xs font-medium hidden">
                  Photo 1
                </div>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-white text-xs">💕</span>
            </div>
          </div>

          {/* Photo Frame 2 */}
          <div className="relative group flex-shrink-0">
            <div className="w-16 h-20 sm:w-24 sm:h-28 md:w-32 md:h-36 lg:w-40 lg:h-44 xl:w-48 xl:h-52 rounded-2xl border-4 border-white/40 bg-white/90 p-1 shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-all duration-500 hover:scale-105 backdrop-blur-sm">
             <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-rose-50 to-purple-100 cursor-pointer" onClick={() => handlePhotoClick(photo2, 2)}>
                <img 
                  src={photo2} 
                  alt="Memory 2" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-rose-100 to-purple-200 flex items-center justify-center text-rose-500 text-xs font-medium hidden">
                  Photo 2
                </div>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-white text-xs">✨</span>
            </div>
          </div>

          {/* Photo Frame 3 */}
          <div className="relative group flex-shrink-0">
            <div className="w-16 h-20 sm:w-24 sm:h-28 md:w-32 md:h-36 lg:w-40 lg:h-44 xl:w-48 xl:h-52 rounded-2xl border-4 border-white/40 bg-white/90 p-1 shadow-2xl transform rotate-1 group-hover:rotate-0 transition-all duration-500 hover:scale-105 backdrop-blur-sm">
              <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100 cursor-pointer" onClick={() => handlePhotoClick(photo3, 3)}>
                <img 
                  src={photo3} 
                  alt="Memory 3" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-200 flex items-center justify-center text-purple-500 text-xs font-medium hidden">
                  Photo 3
                </div>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-white text-xs">💝</span>
            </div>
          </div>
        </div>

        {/* Message Display - Enhanced Responsive */}
        <div className="relative">
          <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 min-h-[140px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[200px] xl:min-h-[220px] flex items-center shadow-2xl overflow-y-auto">
            <div className={`transition-all duration-700 w-full ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed font-medium drop-shadow-2xl text-center px-2">
                {messages[currentMessage]}
              </p>
            </div>
          </div>
          
          {/* Enhanced Quote marks decoration */}
          <div className="absolute -top-3 -left-2 sm:-top-4 sm:-left-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/30 font-serif">"</div>
          <div className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/30 font-serif">"</div>
        </div>

        {/* Enhanced Navigation */}
        <div className="flex flex-col items-center mt-4 sm:mt-6 lg:mt-8 gap-3">
          <div className="flex gap-3">
            <button
              onClick={prevMessage}
              className="bg-pink-500/80 backdrop-blur-md text-white px-4 py-2 sm:px-5 sm:py-3 lg:px-6 lg:py-3 rounded-full shadow-xl hover:shadow-2xl hover:bg-pink-600/90 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base lg:text-lg border border-pink-300/50 font-medium"
              style={{ cursor: 'pointer' }}
            >
              <span className="text-lg">←</span> 
              <span className="hidden xs:inline">Previous</span>
              <span className="xs:hidden">Prev</span>
            </button>

            <button
              onClick={nextMessage}
              className="bg-pink-500/80 backdrop-blur-md text-white px-4 py-2 sm:px-5 sm:py-3 lg:px-6 lg:py-3 rounded-full shadow-xl hover:shadow-2xl hover:bg-pink-600/90 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base lg:text-lg border border-pink-300/50 font-medium"
              style={{ cursor: 'pointer' }}
            >
              <span className="hidden xs:inline">Next</span>
              <span className="xs:hidden">Next</span> 
              <span className="text-lg">→</span>
            </button>
          </div>

          {/* Dots go below buttons */}
          <div className="flex gap-2 sm:gap-3 mt-2">
            {messages.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 shadow-lg ${
                  index === currentMessage 
                    ? 'bg-pink-400 w-6 sm:w-8 lg:w-10 shadow-pink-400/50' 
                    : 'bg-pink-200/60 w-2 hover:bg-pink-300/70'
                }`}
              />
            ))}
          </div>
        </div>


        {/* Enhanced Footer */}
        <div className="text-center mt-6 sm:mt-8 lg:mt-10 pt-4 sm:pt-6 lg:pt-8 border-t border-white/30">
          <div className="flex justify-center items-center gap-2 text-white/90 mb-2">
            <span className="text-sm sm:text-base lg:text-lg font-medium drop-shadow-lg"></span>
            <span className="text-red-400 animate-pulse">❤️</span>
          </div>
          <p className="text-xs sm:text-sm text-white/70 drop-shadow">
            Created by Greggy • {new Date().toLocaleDateString()}
          </p>
        </div>
          </div>
        </div>
      </div>

{/* Photo Modal */}
{showModal && selectedPhoto && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Backdrop */}
    <div 
      className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      onClick={() => setShowModal(false)}
    ></div>
    
    {/* Modal Content */}
    <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-4 max-w-2xl max-h-[90vh] border border-white/30 shadow-2xl">
      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-3 right-3 text-white/80 hover:text-white text-3xl leading-none z-10 bg-black/20 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/40 transition-colors"
        style={{ cursor: 'pointer' }}
      >
        ×
      </button>
      
      {/* Photo Display */}
      <div className="flex items-center justify-center">
        <img 
          src={selectedPhoto.src} 
          alt={`Memory ${selectedPhoto.index}`}
          className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-lg"
        />
      </div>
    </div>
  </div>
)}
    </div>

    
  );
}

export default App;