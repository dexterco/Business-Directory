"use client";
import { FC } from "react";
import Rating from "@/components/common/rating";
import { RootState } from "@/redux-toolkit/store";
import Img from "@/utils/BackgroundImageRatio";
import { useSelector } from "react-redux";

const TopSlider: FC<ITopSliderProps> = ({ sliderData, titleClass }) => {
  const { symbol, currencyValue } = useSelector((state: RootState) => state.currency);
  return (
    <section className={`top-slider ${titleClass}`}>
      <div className="row justify-content-center">
        {sliderData.map((data: ITopCategoryProps, index) => (
          <div key={index} className="col-6 col-sm-6 col-md-6 col-lg-2">
            <div className="top_box">
              <div className="img-part">
                <a href="#">
                  <Img src={data.img} className="img-fluid" alt="" />
                </a>
              </div>
              <div className="right-content" >
                <div>
                  <h5>{data.title}</h5>
                  
                  <p>{data.desc}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopSlider;
