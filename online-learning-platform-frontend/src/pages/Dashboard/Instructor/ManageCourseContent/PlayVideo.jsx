const PlayVideo = ({ url }) => {
    return (
        <video
            key={url}
            autoPlay
            muted
            controls
            className="w-full h-full rounded-lg bg-black"
            src={url}
        >
            Your browser does not support the video tag.
        </video>
    );
};

export default PlayVideo;