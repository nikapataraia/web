import { useEffect, useState } from "react";
import automatic_tranmission_icon from "./assets/autotranss.png";
import engine_icon from "./assets/engine.png";
import gauge_icon from "./assets/gauge.png";
import steering_wheel_icon from "./assets/steering-wheel.png";
import steering_wheel_icon2 from "./assets/steering-wheel2.png";
import car_icon from "./assets/car.png";
import pencil_icon from "./assets/pencil.png";
import heart_icon from "./assets/heart.png";
import cleanhistory_icon from "./assets/cleanhistory";
import siren_icon from "./assets/siren.png";
import verification_icon from "./assets/verification.png";
import ok_icon from "./assets/ok.png";
import check_icon from "./assets/check-mark.png";

export interface IVehicleProps {
  image: string;
  name: string;
  release_year: string;
  engine: string;
  distance: string;
  type: string;
  side: string;
  price: number;
  location: string;
  flag: string;
  gambajebadi: boolean;
  gambajeba_price: number;
  gambajebulia: boolean;
  views: number;
  uploaded: string;
  adds: string;
  vip: number;
  test_drive: boolean;
  isnew: boolean;
  saswrafod: boolean;
  goodcond: boolean;
  cleanhistory: boolean;
  verified: boolean;
  isforrent : boolean;
  smallwindow:boolean;
  category:string | undefined;
  isusd : boolean;
}

const Vehicle: React.FC<IVehicleProps> = ({
  image,
  name,
  release_year,
  engine,
  distance,
  type,
  side,
  price,
  location,
  flag,
  gambajebadi,
  gambajeba_price,
  gambajebulia,
  views,
  uploaded,
  adds,
  vip,
  test_drive,
  isnew,
  saswrafod,
  goodcond,
  cleanhistory,
  verified,
  isforrent,
  smallwindow,
  category,
  isusd
}) => {
  const [vipimg, setvipimg] = useState((<p></p>));
  useEffect(() => {
    setvipimg(<></>)
    if (vip === 1) {
      setvipimg(<p className="sm_vip1">vip</p>);
    }
    if (vip === 2) {
      setvipimg(<p className="sm_vip2">vip+</p>);
    }
    if (vip === 3) {
      setvipimg(<p className="sm_vip3">s-vip</p>);
    }
  });

  if(smallwindow){
    return (<div className="small_veh_holder">
      <div className="sm_veh_name">
          {vipimg}
         <p className="sm_info1_name">
              {name} <span>{release_year} წ</span>
            </p>
      </div>
      <div className="sma_priceses"> 
          <div className="sm_price">
            <div className="sm_pr">
            {price === 0 ? <span>ფასი შეთანხმებით</span> : <>{price} <p> {(isusd ? "$" : "₾" )} </p></>}
            {isforrent ? (<p className="sm_isforrent">ქირავდება</p>) : null}
            </div>
          </div>
          <div className="sm_gambajeba">
              {gambajebulia ? (<p className="info1_gambajebulia">{" "} <img src={check_icon}></img> გამბაჟებულია</p>) : gambajebadi ? (<p className="info1_gambajebaprice">გამბაჟება {gambajeba_price} ₾</p>) : null}
          </div>
      </div>
      <div className="sm_imagecontainer">
          <img src={image}></img>
      </div>
      <div className="sm_infocont">
        <div className="sm_infoleft">
          <p>{distance}</p>
          <p>{engine}</p>
          <p>{type}</p>
        </div>
        <div className="sm_inforight">
          <p>{category}</p>
          <p>{side}</p>
          <p> <img className="sm_flag" src={flag}></img> {location}</p>
        </div>
      </div>
      <div className="sm_addiinfo1">
            {saswrafod ? (<p className="sm_saswrafod">{" "}<img src={siren_icon}></img> სასწრაფოდ{" "}</p>) : null}
            {goodcond ? (<p className="sm_idealuri">{" "}<img src={ok_icon}></img> იდეალურ მდგომარეობაში{" "}</p>) : null}
            {cleanhistory ? (<p className="sm_istoria">{" "}<div dangerouslySetInnerHTML={{ __html: cleanhistory_icon }}></div>{" "}სუფთა ისტორია{" "}</p>) : null}
            {verified ? (<p className="sm_verificirebuli">{" "}<img src={verification_icon}></img> ვერიფიცირებული{" "}</p>) : null}
      </div>
      <div className="sm_line"></div>

      <div className="sm_addiinfo2">
              <p className="sm_info2left"> {views} naxva &#8226; {uploaded} </p>
              <div className="sm_info2right">
                  <img src={car_icon}></img>
                  <img src={pencil_icon}></img>
              </div>
      </div>

    </div>)








  }
  else {
  return (
    <div className="veh_holder">
      <div className="veh_imgcontainer">
        <img src={image}></img>
      </div>
      <div className="veh_info">
        <div className="veh_info_1">
          <div className="info1_floaterleft">
            {isnew ? <p className="info1_new">ახალი</p> : null}
            {isforrent ? (<p className="info1_isforrent">ქირავდება</p>) : null}
            <p className="info1_name">
              {name} <span>{release_year} წ</span>
            </p>
          </div>
          <div className="info1_floaterright">
            {gambajebulia ? (<p className="info1_gambajebulia">{" "} <img src={check_icon}></img> გამბაჟებულია</p>) : gambajebadi ? (<p className="info1_gambajebaprice">გამბაჟება {gambajeba_price} ₾</p>) : null}
            <img className="info1_flag" src={flag}></img>
            <p className="info1_location">{location}</p>
          </div>
        </div>

        <div className="veh_info_2">
          <div className="info2_stats">
            <div className="info2_stats1">
              <p>
                {" "}
                <img src={engine_icon}></img> {engine}{" "}
              </p>
              <p>
                {" "}
                <img src={gauge_icon}></img> {distance}{" "}
              </p>
              <p>
                {" "}
                <img src={automatic_tranmission_icon}></img> {type}{" "}
              </p>
              <p>
                {" "}
                <img src={steering_wheel_icon}></img> {side}{" "}
              </p>
            </div>
            <div className="info2_stats2">
              <p>
                {price === 0 ? <span>ფასი შეთანხმებით</span> : <>{price} <p> {(isusd ? "$" : "₾" )} </p></>}
              </p>
            </div>
          </div>
          <div className="veh_info_3">
            <p className="veh_info_3_left">
              {" "}
              {vipimg} {views} naxva &#8226; {uploaded}
            </p>
            <div className="veh_info_3_right">
              <img src={pencil_icon}></img>
              <img src={car_icon}></img>
              <img src={heart_icon}></img>
            </div>
          </div>
        </div>
      </div>
      <div className="veh_additional">
        {adds ||test_drive ||saswrafod ||goodcond ||cleanhistory ||verified ? (<div className="veh_line"></div>) : null}
        <div className="veh_additional_container">
          {saswrafod || goodcond || cleanhistory ? (
            <div className="veh_addi_1">
              <div>
                {saswrafod ? (<p>{" "}<img src={siren_icon}></img> სასწრაფოდ{" "}</p>) : null}
                {goodcond ? (<p>{" "}<img src={ok_icon}></img> იდეალურ მდგომარეობაში{" "}</p>) : null}
                {cleanhistory ? (<p>{" "}<div dangerouslySetInnerHTML={{ __html: cleanhistory_icon }}></div>{" "}სუფთა ისტორია{" "}</p>) : null}
                {verified ? (<p>{" "}<img src={verification_icon}></img> ვერიფიცირებული{" "}</p>) : null}</div>
              {test_drive ? (<button className="veh_testdrive">{" "}<img src={steering_wheel_icon2}></img> ტესტ დრაივი </button>) : null}
            </div>
          ) : null}
        </div>
        {adds ? (
          <div className="veh_addi_2">
            <div className="veh_addcontainer">{adds}</div>
          </div>
        ) : null}
      </div>
    </div>
  );}
};

export default Vehicle;
