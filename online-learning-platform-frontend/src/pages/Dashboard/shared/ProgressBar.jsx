const ProgressBar = ({ value }) => {
    return (
        <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div className="h-full bg-[#309255] rounded-full transition-all duration-500" style={{ width: `${value}` }}></div>
        </div>
    );
};

export default ProgressBar;