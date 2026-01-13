import { Award, BadgeCheck } from 'lucide-react';
import { toPng } from 'html-to-image';
import { useEffect } from 'react';

const Certificate = ({ studentName = "Arfan Ahmed", courseName = "Web Development" }) => {

    useEffect(() => {
        const generateImage = async () => {
            const node = document.getElementById("certificate");
            if (!node) return;

            await document.fonts.ready;

            const dataUrl = await toPng(node, {
                pixelRatio: 3,
                cacheBust: true,
            });
            console.log(dataUrl);
        };

        generateImage();
    }, []);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 p-10 font-serif">
            <div id='certificate' className="relative w-262.5 h-187.5 bg-[#fdfbf7] shadow-[0_20px_60px_rgba(0,0,0,0.2)] overflow-hidden text-[#1a2e35]">

                {/* --- Background Pattern (Subtle Watermark) --- */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                    <Award size={500} strokeWidth={0.5} />
                </div>

                {/* Corner Flourishes */}
                <div className="absolute top-6 left-6 w-32 h-32 border-t-4 border-l-4 border-[#c5a059] rounded-tl-3xl"></div>
                <div className="absolute top-6 right-6 w-32 h-32 border-t-4 border-r-4 border-[#c5a059] rounded-tr-3xl"></div>
                <div className="absolute bottom-6 left-6 w-32 h-32 border-b-4 border-l-4 border-[#c5a059] rounded-bl-3xl"></div>
                <div className="absolute bottom-6 right-6 w-32 h-32 border-b-4 border-r-4 border-[#c5a059] rounded-br-3xl"></div>

                {/* --- Content Container --- */}
                <div className="relative z-10 h-full flex flex-col justify-between py-20 px-24 text-center">

                    {/* Header Section */}
                    <div>
                        <div className="flex justify-center mb-6">
                            <div className="bg-[#1a2e35] text-white p-3 rounded-full shadow-lg">
                                <Award size={32} />
                            </div>
                        </div>

                        <h1 className="font-cinzel text-5xl font-bold text-[#c5a059] uppercase tracking-wide leading-tight">
                            Certificate
                        </h1>
                        <p className="font-lato uppercase tracking-[0.4em] text-[#1a2e35] text-xs font-bold mb-4">
                            of Completion
                        </p>
                        <p className="mt-4 font-lato text-gray-500 italic text-lg">
                            This is to certify that
                        </p>
                    </div>

                    {/* Student Name Section - UPDATED FONT */}
                    <div className="py-6 relative">

                        {/* Using Playfair Display now: Clear, Bold, Italicized for elegance */}
                        <h2 className="relative z-10 inline-block px-8 bg-[#fdfbf7] font-playfair italic font-bold text-7xl text-[#1a2e35] tracking-wide">
                            {studentName}
                        </h2>
                    </div>

                    {/* Course Details */}
                    <div>
                        <p className="font-lato text-xl text-gray-600">
                            has successfully completed the course of
                        </p>
                        <h3 className="mt-4 font-cinzel text-3xl font-bold text-[#c5a059] uppercase tracking-widest inline-block pb-2">
                            {courseName}
                        </h3>
                        <p className="mt-4 font-lato text-sm text-gray-500">
                            Awarded on <span className="font-bold text-gray-700">{new Date().toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}</span>
                        </p>
                    </div>

                    {/* Footer / Signatures */}
                    <div className="mt-6 flex justify-between items-end px-10">
                        {/* Instructor */}
                        <div className="text-center group">
                            <div className="w-64 mx-auto border-b border-[#1a2e35] pb-2 relative">
                                <div className="absolute bottom-2 left-0 w-full text-center font-script text-4xl text-[#1a2e35]/80 -rotate-2">
                                    Mithila
                                </div>
                            </div>
                            <p className="mt-2 font-cinzel text-xs font-bold uppercase tracking-wider text-[#1a2e35]">
                                Lead Instructor
                            </p>
                        </div>

                        {/* Gold Seal Element */}
                        <div className="relative bottom-4">
                            <div className="w-32 h-32 bg-linear-to-br from-[#d4af37] via-[#f9e58b] to-[#b49228] rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                                <div className="w-28 h-28 border border-white/50 rounded-full flex items-center justify-center p-2">
                                    <div className="text-center text-[#7a5e0b]">
                                        <BadgeCheck size={64} className="mx-auto drop-shadow-md text-white/90" />
                                        <span className="block text-[10px] font-bold mt-1 uppercase tracking-widest text-white/90">Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Director */}
                        <div className="text-center">
                            <div className="w-64 mx-auto border-b border-[#1a2e35] pb-2 relative">
                                <div className="absolute bottom-2 left-0 w-full text-center font-script text-4xl text-[#1a2e35]/80 rotate-1">
                                    Shohag
                                </div>
                            </div>
                            <p className="mt-2 font-cinzel text-xs font-bold uppercase tracking-wider text-[#1a2e35]">
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