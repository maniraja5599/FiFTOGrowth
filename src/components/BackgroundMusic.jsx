import React, { useState, useEffect, useRef } from 'react';
import Volume2 from 'lucide-react/dist/esm/icons/volume-2';
import VolumeX from 'lucide-react/dist/esm/icons/volume-x';

const BackgroundMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Reliable ambient track (Kevin MacLeod - Impact Prelude)
    // Alternate: https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Impact/Kevin_MacLeod_-_01_-_Impact_Prelude.mp3
    const audioUrl = "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Impact%20Prelude.mp3";

    useEffect(() => {
        const playAudio = async () => {
            if (audioRef.current) {
                try {
                    audioRef.current.volume = 0.3;
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.log("Autoplay blocked:", err);
                    setIsPlaying(false);
                }
            }
        };

        // Try to play immediately
        playAudio();

        // Retry on first interaction
        const handleInteraction = () => {
            if (!hasInteracted && audioRef.current && audioRef.current.paused) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                    setHasInteracted(true);
                }).catch(e => console.log("Play failed on interaction:", e));
            }
        };

        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('scroll', handleInteraction, { once: true });

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
        };
    }, [hasInteracted]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            <audio
                ref={audioRef}
                src={audioUrl}
                loop
                onError={(e) => console.log("Audio load error:", e)}
            />

            {/* Tooltip/Hint if not playing */}
            {!isPlaying && !hasInteracted && (
                <div className="bg-premium-dark/90 text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 shadow-lg animate-bounce mb-2">
                    Click to Enable Sound
                </div>
            )}

            <button
                onClick={togglePlay}
                className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg group ${isPlaying
                        ? 'bg-premium-gold/20 border-premium-gold text-premium-gold hover:bg-premium-gold/30'
                        : 'bg-white/10 border-white/20 text-gray-400 hover:bg-white/20 hover:text-white'
                    }`}
                title={isPlaying ? "Mute Background Music" : "Play Background Music"}
            >
                {isPlaying ? (
                    <div className="relative">
                        <Volume2 className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-premium-gold opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-premium-gold"></span>
                        </span>
                    </div>
                ) : (
                    <VolumeX className="w-6 h-6" />
                )}
            </button>
        </div>
    );
};

export default BackgroundMusic;
