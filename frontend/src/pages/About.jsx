import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const About = () => {

  const navigate = useNavigate();

  return (
    <div className="sm:px-4 lg:px-0 md:pt-12 lg:pt-15 ">

      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 sm:hidden">
        <div className="flex items-center justify-between px-4 py-4">
          {/* BACK BUTTON */}
          <button onClick={() => navigate(-1)}>
            <FiChevronLeft className="w-7 h-7" />
          </button>

          
        </div>
      </div>

      <div className="sm:flex sm:flex-col sm:justify-center sm:items-center lg:block">

        <div className="text-2xl mt-5 sm:mt-0 sm:text-3xl font-semibold text-center">
          <Title text1={"ABOUT"} text2={"US"} />
        </div>

        <div className="my-10 lg:my-16 flex flex-col px-4 sm:px-0 lg:flex-row items-center justify-center gap-10 lg:gap-16">

          <img
            className="w-full lg:max-w-[450px]"
            src={assets.about_img}
            alt=""
          />

          <div className="flex flex-col justify-center gap-5 lg:gap-6 lg:w-2/4 text-gray-600">

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              quidem reprehenderit eaque enim fugit odit molestias omnis iure amet
              voluptate sit reiciendis ab voluptas tempore eligendi rem, beatae
              temporibus dolorem illo harum saepe esse! Impedit saepe consequatur
              perferendis provident quod.
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              quibusdam similique molestiae illum ab exercitationem blanditiis
              iusto quidem nostrum. Quaerat mollitia voluptatem provident
              veritatis ad? Corrupti dignissimos, reprehenderit architecto magni
              id molestias facilis quae assumenda accusantium nam sint dolore
              tempore iusto quisquam minima qui ipsa harum quidem velit at? Rerum!
            </p>

            <b className="text-gray-800">Our Mission</b>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              ratione repellendus consequuntur eius, itaque pariatur voluptate et
              vero quo, enim, earum alias? A rem quas vel, nulla voluptatum
              obcaecati quibusdam sint, assumenda facilis, nemo totam et non enim
              omnis ea dolorum quidem! Excepturi, saepe. Id exercitationem
              reiciendis soluta tenetur ratione.
            </p>

          </div>

        </div>

        <div className="px-4 sm:px-0 lg:px-30 flex flex-col justify-center lg:w-full">

          <div className="text-xl sm:text-2xl font-medium pt-4 pb-9 sm:pb-12">
            <Title text1={"WHY"} text2={"CHOOSE US"} />
          </div>

          <div className="flex flex-col lg:flex-row text-sm mb-14 sm:mb-20 lg:mb-25">

            <div className="border border-gray-300 px-6 sm:px-10 lg:px-16 py-8 sm:py-14 lg:py-20 flex flex-col gap-3 sm:gap-5">
              <b className="text-md sm:text-lg">Quality Assurance:</b>
              <p className="text-gray-600">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae
                illum praesentium nostrum fugit corrupti placeat?
              </p>
            </div>

            <div className="border border-gray-300 px-6 sm:px-10 lg:px-16 py-8 sm:py-14 lg:py-20 flex flex-col gap-3 sm:gap-5">
              <b className="text-md sm:text-lg">Convenience:</b>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam et
                quos distinctio corporis, molestias cumque.
              </p>
            </div>

            <div className="border border-gray-300 px-6 sm:px-10 lg:px-16 py-8 sm:py-14 lg:py-20 flex flex-col gap-3 sm:gap-5">
              <b className="text-md sm:text-lg">Exceptional Customer Service:</b>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
                possimus id voluptas, harum ex temporibus!
              </p>
            </div>
          </div>
        </div>

      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
