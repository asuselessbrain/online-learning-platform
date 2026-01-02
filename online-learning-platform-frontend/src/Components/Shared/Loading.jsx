import React from 'react';

const Loading = ({ message = "Loading...", size = "md", fullScreen = false }) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
        xl: "w-16 h-16"
    };

    const spinnerContent = (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className={`relative ${sizeClasses[size]}`}>
                <div className="absolute inset-0 rounded-full border-4 border-[#e7f8ee] border-t-[#309255] animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-[#309255]/30 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            {message && (
                <p className="text-gray-600 font-medium animate-pulse">
                    {message}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                {spinnerContent}
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center py-8">
            {spinnerContent}
        </div>
    );
};

export default Loading;