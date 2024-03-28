// import React from "react";
import { formateDate } from "../../utils/formateDate";
const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About Of
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            ZAKHBAT MOHAMMED
          </span>
        </h3>
        <p className="text__para">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae odio
          velit voluptates consectetur ducimus temporibus sint accusamus omnis
          quod, voluptatum, atque dolore, molestiae consequatur. Porro velit
          itaque deserunt esse doloribus.
        </p>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold ">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formateDate("10-30-2008")}- {formateDate("07-30-2015")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                PHD in Surgeon
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              Hopital Sheikh Zayed, RABAT
            </p>
          </li>
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formateDate("10-30-2015")} -{formateDate("12-16-2022")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                PHD in Surgeon
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              Hopital Sheikh Zayed, RABAT
            </p>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold ">
          Experience
        </h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold ">
              {formateDate("10-30-2017")} -{formateDate("12-16-2022")}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              Hopital Sheikh Zayed, RABAT
            </p>
          </li>
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold ">
              {formateDate("10-30-2017")} -{formateDate("12-16-2022")}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              Hopital Sheikh Zayed, RABAT
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
