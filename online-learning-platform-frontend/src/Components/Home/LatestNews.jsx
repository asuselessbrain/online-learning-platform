import HomePageHeadingSubHeading from "../Shared/HomePageHeadingSubHeading";
import BlogsCard from "../Shared/BlogsCard";

const LatestNews = () => {
    return (
        <section className="max-w-[1440px] mx-auto mb-20 px-4 2xl:px-0">
            <HomePageHeadingSubHeading
                subTitle="Latest News"
                firstTitle="Educational Tips &"
                secondTitle="Tricks"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6">
                <BlogsCard />
                <BlogsCard />
                <BlogsCard />
            </div>
        </section>
    );
};

export default LatestNews;