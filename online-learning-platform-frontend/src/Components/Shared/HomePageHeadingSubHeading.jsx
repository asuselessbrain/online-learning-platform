import img from "../../assets/images/shape-4.webp";

const HomePageHeadingSubHeading = ({subTitle, firstTitle, secondTitle}) => {
  return (
    <div className="w-full text-center my-10">
      <p className="text-xl text-[#309255]">{subTitle}</p>

      <h2 className="text-[40px] mt-2 mb-6">
        {firstTitle}{" "}
        <span className="relative inline-block text-[#329357]">
          {secondTitle}
          <img
            src={img}
            alt="icons"
            className="absolute left-0 top-full mt-1"
          />
        </span>
      </h2>
    </div>
  );
};

export default HomePageHeadingSubHeading;
