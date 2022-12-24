import Toggler from "v2/components/main/Toggler";
import LevelsList from "v2/components/main/LevelsList";
import Testimonial from "v2/components/main/Testimonial";

const Header = ({ levels, setShowVideo }) => {
  return (
    <div className={`w-full md:w-[80%] mx-auto my-5`}>
      <div className="md:w-[90%] md:mx-auto flex justify-between items-cneter flex-col-reverse lg:flex-row  gap-[20px]">
        <LevelsList levels={levels} />

        <Testimonial setShowVideo={setShowVideo} />
      </div>

      <Toggler />
    </div>
  );
};

export default Header;
