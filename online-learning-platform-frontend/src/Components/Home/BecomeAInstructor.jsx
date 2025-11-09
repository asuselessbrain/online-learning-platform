import img from "../../assets/images/shape-4.webp"

const BecomeAInstructor = () => {
    return (
        <section className="bg-[#eefbf3] px-4 2xl:px-0">
            <div className="max-w-[1440px] mx-auto py-30 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="max-w-[415px]">
                    <p className="text-xl text-[#309255]">Become A Instructor</p>
                    <h2 className="text-[40px] mt-6">You can join with Edule as <span className="text-[#329357]">a instructor?</span></h2>
                    <div className="flex items-center justify-end">
                        <img src={img} alt="icons" className="my-2 w-1/2" />
                    </div>
                </div>
                <div className="hidden lg:block">
                    <img src="https://htmldemo.net/edule/eduLe/assets/images/shape/shape-13.svg" alt="arrow" />
                </div>
                <div>
                    <button className="mt-7 bg-[#329357] px-6 py-4 text-white rounded-md">Drop Information</button>
                </div>
            </div>
        </section>
    );
};

export default BecomeAInstructor;