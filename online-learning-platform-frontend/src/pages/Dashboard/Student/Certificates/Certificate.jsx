import { Award, BadgeCheck } from "lucide-react";

const Certificate = ({
    ref, studentName, courseName
}) => {


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 p-10">
            {/* CERTIFICATE */}
            <div
                ref={ref}
                className="relative w-[1123px] h-[794px] bg-[#fdfbf7] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)] text-[#1a2e35]"
            >
                {/* Watermark */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                    <Award size={520} strokeWidth={0.5} />
                </div>

                {/* Corners */}
                <div className="absolute top-6 left-6 w-32 h-32 border-t-4 border-l-4 border-[#c5a059] rounded-tl-3xl" />
                <div className="absolute top-6 right-6 w-32 h-32 border-t-4 border-r-4 border-[#c5a059] rounded-tr-3xl" />
                <div className="absolute bottom-6 left-6 w-32 h-32 border-b-4 border-l-4 border-[#c5a059] rounded-bl-3xl" />
                <div className="absolute bottom-6 right-6 w-32 h-32 border-b-4 border-r-4 border-[#c5a059] rounded-br-3xl" />

                {/* CONTENT */}
                <div className="relative z-10 h-full flex flex-col py-14 px-24 text-center">
                    {/* Header */}
                    <div>
                        <div className="flex justify-center mb-6">
                            <div className="bg-[#1a2e35] text-white p-3 rounded-full shadow-lg">
                                <Award size={32} />
                            </div>
                        </div>

                        <h1 className="font-cinzel text-5xl font-bold text-[#c5a059] uppercase tracking-wide">
                            Certificate
                        </h1>

                        <p className="font-lato uppercase tracking-[0.4em] text-xs font-bold mt-2">
                            of Completion
                        </p>

                        <p className="mt-6 font-lato italic text-gray-500 text-lg">
                            This is to certify that
                        </p>
                    </div>

                    {/* Name */}
                    <div className="mt-10 mb-8">
                        <h2 className="mx-auto max-w-[900px] font-playfair italic font-bold text-7xl tracking-wide break-words">
                            {studentName}
                        </h2>
                    </div>

                    {/* Course */}
                    <div>
                        <p className="font-lato text-xl text-gray-600">
                            has successfully completed the course of
                        </p>

                        <h3 className="mt-4 font-cinzel text-3xl font-bold text-[#c5a059] uppercase tracking-widest">
                            {courseName}
                        </h3>

                        <p className="mt-6 font-lato text-sm text-gray-500">
                            Awarded on{" "}
                            <span className="font-bold text-gray-700">
                                {new Date().toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-14 flex justify-between items-end px-10">
                        {/* Instructor */}
                        <div className="text-center">
                            <div className="w-64 mx-auto border-b border-[#1a2e35] pb-2 relative">
                                <div className="absolute bottom-2 left-0 w-full text-center font-script text-4xl -rotate-2 opacity-80">
                                    Mithila
                                </div>
                            </div>
                            <p className="mt-2 font-cinzel text-xs font-bold uppercase tracking-wider">
                                Lead Instructor
                            </p>
                        </div>

                        {/* Seal */}
                        <div className="relative">
                            <div className="w-32 h-32 bg-gradient-to-br from-[#d4af37] via-[#f9e58b] to-[#b49228] rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                                <div className="w-28 h-28 border border-white/50 rounded-full flex items-center justify-center">
                                    <div className="text-center">
                                        <BadgeCheck size={60} className="mx-auto text-white" />
                                        <span className="block text-[10px] font-bold mt-1 uppercase tracking-widest text-white">
                                            Verified
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Director */}
                        <div className="text-center">
                            <div className="w-64 mx-auto border-b border-[#1a2e35] pb-2 relative">
                                <div className="absolute bottom-2 left-0 w-full text-center font-script text-4xl rotate-1 opacity-80">
                                    Shohag
                                </div>
                            </div>
                            <p className="mt-2 font-cinzel text-xs font-bold uppercase tracking-wider">
                                Program Director
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Certificate;
