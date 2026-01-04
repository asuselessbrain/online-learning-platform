
const PageHeading = ({ title, subtitle }) => {
    return (
        <div>
            <h2 className="text-2xl">{title}</h2>
            <p className="text-[#4A5565] mt-2">{subtitle}</p>
        </div>
    );
};

export default PageHeading;