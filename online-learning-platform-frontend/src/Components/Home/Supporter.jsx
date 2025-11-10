import img from "../../assets/images/shape-4.webp";

const Supporter = () => {

    const partners = [
        {
            "name": "Google",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            "website": "https://www.google.com"
        },
        {
            "name": "Microsoft",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
            "website": "https://www.microsoft.com"
        },
        {
            "name": "Amazon",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
            "website": "https://www.amazon.com"
        },
        {
            "name": "Facebook",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
            "website": "https://www.facebook.com"
        },
        {
            "name": "Apple",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
            "website": "https://www.apple.com"
        },
        {
            "name": "Netflix",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
            "website": "https://www.netflix.com"
        },
        {
            "name": "LinkedIn",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
            "website": "https://www.linkedin.com"
        }
    ]


    return (
        <section className="bg-[#eefbf3] px-4 2xl:px-0 py-20">
            <div className="max-w-[1440px] mx-auto overflow-hidden">
                <h2 className="text-[40px] mt-2 mb-6">
                    Best Supporter of{" "}
                    <span className="relative inline-block text-[#329357]">
                        Edule.
                        <img
                            src={img}
                            alt="icons"
                            className="absolute left-0 top-full mt-1"
                        />
                    </span>
                </h2>
                <div className="flex w-full overflow-hidden mt-6" style={{
                    WebkitMaskImage:
                        'linear-gradient(to right, transparent 0px, black 128px, black calc(100% - 128px), transparent 100%)',
                    maskImage:
                        'linear-gradient(to right, transparent 0px, black 128px, black calc(100% - 128px), transparent 100%)',
                }}>
                    <div className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                        {[...partners, ...partners].map((partner, index) => (
                            <img
                                src={partner.logo}
                                className="w-44 mr-16 shrink-0"
                                alt={partner.name}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Supporter;