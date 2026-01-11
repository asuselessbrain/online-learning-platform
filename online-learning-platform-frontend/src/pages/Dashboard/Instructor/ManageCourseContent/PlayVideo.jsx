const PlayVideo = ({ url, onprogress }) => {

    const handleTimeUpdate = e => {
        const video = e.target;

        const progress = (video.currentTime / video.duration) * 100

        if (progress > 90) {
            onprogress(true)
        }
    }
    return (
        <video
            key={url}
            autoPlay
            muted
            controls
            className="w-full h-full rounded-lg bg-black"
            src={url}
            onTimeUpdate={handleTimeUpdate}
        >
            Your browser does not support the video tag.
        </video>
    );
};

export default PlayVideo;