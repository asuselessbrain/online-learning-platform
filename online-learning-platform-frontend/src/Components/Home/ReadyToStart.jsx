const ReadyToStart = () => {
    return (
        <section className="bg-[#309255] px-4 2xl:px-0 my-20 text-white relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto py-30 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="max-w-[400px] lg:max-w-[500px]">
                    <p className="text-xl">Ready to start?</p>
                    <h2 className="text-[30px] lg:text-[40px] mt-6">Download our mobile app. for easy to start your course.</h2>
                </div>
                <div className="hidden lg:block animate-left-to-right">
                    <img src="https://htmldemo.net/edule/eduLe/assets/images/shape/shape-14.png" alt="arrow" />
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-6 py-4 bg-white rounded-xl border-4 hover:cursor-pointer border-[#4fa26e]"><img src="https://htmldemo.net/edule/eduLe/assets/images/google-play.png" alt="" /></button>
                    <button className="px-6 py-4 bg-white rounded-xl border-4 hover:cursor-pointer border-[#4fa26e]"><img src="https://htmldemo.net/edule/eduLe/assets/images/app-store.png" alt="" /></button>
                </div>
            </div>
            <div className="h-[500px] w-[500px] bg-transparent rounded-full absolute border-2 border-[rgba(255,255,255,0.15)] -top-[70%] left-[5%]"></div>
            <div className="h-[500px] w-[500px] bg-transparent rounded-full absolute border-2 border-[rgba(255,255,255,0.15)] -bottom-[70%] left-[30%]"></div>
            <div className="h-[500px] w-[500px] bg-transparent rounded-full absolute border-2 border-[rgba(255,255,255,0.15)] -top-[70%] left-[50%]"></div>
            <div className="h-[500px] w-[500px] bg-transparent rounded-full absolute border-2 border-[rgba(255,255,255,0.15)] -bottom-[70%] left-[80%]"></div>
        </section>
    );
};

export default ReadyToStart;