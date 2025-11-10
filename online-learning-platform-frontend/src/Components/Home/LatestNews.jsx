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

            <div className="flex items-center gap-6">
                <BlogsCard />
                <BlogsCard />
                <BlogsCard />
            </div>
        </section>
    );
};

export default LatestNews;