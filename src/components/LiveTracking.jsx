import React from 'react';
import Play from 'lucide-react/dist/esm/icons/play';
import Activity from 'lucide-react/dist/esm/icons/activity';

const LiveTracking = () => {
    const [videoId, setVideoId] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchLatestVideo = async () => {
            try {
                const RSS_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCXWV4rsmQtbq8V3rzUL9DGA';
                const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`);
                const data = await response.json();

                if (data.items && data.items.length > 0) {
                    // Get the latest video ID
                    // The GUID is usually in format "yt:video:VIDEO_ID"
                    const latestVideo = data.items[0];
                    const id = latestVideo.guid.split(':')[2];
                    setVideoId(id);
                }
            } catch (error) {
                console.error('Error fetching latest video:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestVideo();
    }, []);

    // Fallback to live stream URL if no specific video found or error
    const embedUrl = videoId
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
        : "https://www.youtube.com/embed/live_stream?channel=UCXWV4rsmQtbq8V3rzUL9DGA";

    return (
        <section id="live-tracking" className="py-20 bg-premium-dark relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        {videoId ? 'Latest Session' : 'Live Now'}
                    </div>
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="text-white">Everyday</span> <span className="text-premium-gold">Live Trading</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Witness our execution in real-time. We believe in absolute transparency.
                        Watch our live trading sessions every market day.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-premium-gold to-blue-600 rounded-2xl blur opacity-20"></div>
                    <div className="relative bg-black rounded-2xl overflow-hidden aspect-video border border-white/10 shadow-2xl">
                        <iframe
                            className="w-full h-full"
                            src={embedUrl}
                            title="FiFTO Live Trading"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LiveTracking;
