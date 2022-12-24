const Heading = ({ main }) => {
  return (
    <div className=" w-fit mx-auto md:w-full flex flex-wrap flex-col-reverse md:flex-row items-center md:items-end justify-center md:justify-end gap-3">
      <div className="">
        <p className="text-[#26ABBB] text-[21px]  mb-1 pb-0 text-right hidden md:block ">
          {main}
        </p>

        <p className="text-[#26ABBB] text-[21px]  mb-1 pb-0 text-center md:hidden ">
          {" "}
          {main}
        </p>
      </div>

      <img
        src="/assets/ابتدائي.png"
        alt=""
        className="object-cover w-[100px]"
      />
    </div>
  );
};

export default Heading;
