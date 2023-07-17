import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Vehicle from "./vehicle";
import { Product } from "./domain/product";
import { Model } from "./domain/model";
import { Cat } from "./domain/cat";
import { Manufacturer } from "./domain/manufacturer";
import { Meta } from "./domain/meta";
import { stringify } from "querystring";
const geo_flag =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP8AAACqCAMAAABVlWm8AAAAb1BMVEX/////AAD/f3//7u7/dXX/6+v/urr/8/P/lJT/qKj/xcX/m5v/ODj//Pz/BAT/UFD/0tL/bW3/HBz/KCj/IiL/ZWX/QED/jIz/4uL/wMD/+Pj/rq7/Rkb/t7f/WFj/19f/eHj/EBD/MDD/iYn/zc1ghzZ4AAADGUlEQVR4nO2d6XaqMBRGKTiAiuA8tYrD+z9j71UBe4fiiYRGz97/WF1fwl5FjElWjuc1iv9Whd/sDTUM/vjjjz/++OOPP/74448//vg/if+qk7aDtRcEu96mLQ1b8G9vessg8NZBO+2spGEDRjc3G0jDFvyDm/BIGjagX3Y3FodtPP/jMtwXh+X0yu7exWEb/u9l+CQOy+mW3bXEYRv+rSI77IrDBpTPm/xxs+EfFln559GEQdFfR5y14f9RZAfirAnbor+dOGvDf1dkt+KsCVnR31qcteG/LrKZOGtC8Xkz+LhZGf/t82wozxoQ5d1N5Fkr/pM8u5FnDejk3c3lWSv+xQvZ2vC3PU2yKL2Odk95d8nlOl6uwtngvrFAXf6twSxcLePLRZJn08t1cIqyZCr+bfIN8fDc/v6QzFrHY/H/D/3Rdj4dCu67Lv9LO8PpfDvyw3mePR5bs+Swv/wtfkT4T8b/vNdb7hsL1eXfr2yn3rHQpLK/+949dflHle0YvJy/4VDZ38dd7dTlv6ls5/CI7l8MKvu7byxcl3+nsp16x8La/bU//9rff659/4WV7dT6/Xcz/skWi7wL58Y/i0VmZ/zza/zrR+l1dsn58W83jfx6x79fUPj75wvu/v6N5FkDtM9/aJ//0j7/qX3+W/n6h8PrX29NrH+5vP7ZE4flaF//vt3/4ML+j6b3P5z3v8ReN1g6tP+l68VN7X95iBfY//QQ+OOPP/74448//vjjjz/++OP/M/6VN/Ta4K8b/HWDv27w1w3+usFfN/jrBn/d4K8b/HWDv27w1w3+usFfN/jrBn/dqPdvFvf2vzQL/vjjjz/++OOPP/74448//vg/iT/1X0qo/yLkBc6/cfn8I+q/NIDy88/Un3+n/fxD7edfaj//1N3zb6n/Ygnqv5zbp/7L/6H+yz08a/0D7fUvtNc/0e6v/fnX/v5z7fuP+i+/of7LGeq/XKH+SxNon//QPv+lff5T+/y38vUPh9e/qP8iDsvRvv5N/RfqvxjzAvufHgJ//PHHH3/88ccff/zxxx9//H/E/xOFbWUJ6PMGcQAAAABJRU5ErkJggg==";

export interface IVehicleContainerProps {
  product_lst: Product[];
  models: [Model[],number][];
  cat_lst: Cat[];
  manufacturers: Manufacturer[];
  page: number;
  addpagetolist: Function;
  handlePageChange(newPage: number): void;
  isusd:boolean;
  doeverythingformans : Function;
  smallwindow : boolean;

}

export default function Vehicle_container({
  product_lst,
  models,
  cat_lst,
  manufacturers,
  page,
  handlePageChange,
  isusd,
  doeverythingformans,
  smallwindow,
}: IVehicleContainerProps) {
  return (
    <div className="vehicle_container">
      {product_lst.map((prod , index) => {
        const piclink ="https://static.my.ge/myauto/photos/" +prod.photo +"/thumbs/" +prod.car_id +"_1.jpg?v=" +prod.photo_ver;
        const price = (isusd ? prod.price_usd : prod.price_value)
        const release_year = String(prod.prod_year);
        const distance = String(prod.car_run_km);
        const engine_vol = String(prod.engine_volume / 1000);
        const goodcond = prod.conditioner? prod.condition_type_id === 0? false: true: false;
        const side = prod.right_wheel ? "მარჯვნივ" : "მარცხნივ";
        const manufac = manufacturers?.find((obj) => obj.man_id === String(prod.man_id));
        doeverythingformans(prod.man_id)
        const allmodels = models.find((obj) => obj[1] === prod.man_id)
// name generation
        const name_extension1 = allmodels?.[0].find((obj) => obj.model_id === prod.model_id);
        const name_extension2 = cat_lst?.find((obj) => obj.category_id === prod.category_id);
        const namee = manufac?.man_name + "  " +(name_extension1 ? name_extension1.model_name : "");

// data generation
        const orderdate  : string = prod.order_date
        const orderDate: Date = new Date(orderdate);
        const currentDate: Date = new Date();
        const timeDifference: number = currentDate.getTime() - orderDate.getTime();
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);
        const uploaded = (years !== 0) ? (String(years) + " წლის წინ") : ((months !== 0) ? (String(months) + " წლის წინ") : 
        ((weeks !== 0) ? (String(weeks) + " კვირის წინ") : ((days !== 0) ? (String(days) + " დღის წინ") : (hours !== 0 ? (String(hours) + " საათის წინ") : 
        (minutes !== 0 ? (String(minutes) + " წუთის წინ") : ("წამების წინ"))
        ))))
        function getRandomNumber(min: number, max: number): number {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        return (
          <Vehicle
            image={piclink}
            name={String(namee)}
            release_year={release_year}
            engine={engine_vol + " დატ. ჰიბრიდი"}
            distance={distance + " კმ"}
            type={"ავტომატიკა"}
            side={side}
            price={price}
            location={"სამარგალო"}
            gambajebadi={prod.customs_passed}
            flag={geo_flag}
            gambajeba_price={getRandomNumber(200,1500)}
            gambajebulia={(page * 15 + index) % 4 === 0}
            views={prod.views}
            uploaded={uploaded}
            adds={""}
            vip={(page * 15 + index) % 5}
            test_drive={(page * 15 + index) % 5 === 0}
            isnew={Number(release_year) >= 2023}
            cleanhistory={(page * 15 + index) % 8 === 0}
            goodcond={goodcond}
            saswrafod={(page * 15 + index) % 5 === 0}
            verified={(page * 15 + index) % 6 === 0}
            isforrent={prod.for_rent}
            smallwindow = {smallwindow}
            category= {name_extension2?.title}
            isusd = {isusd}
          />
        );
      })}

      <div className="pagehandlebut">
        <button className ="returnfirstpagebut" onClick={() => handlePageChange(1)}>
          პირველ გვერდზე დაბრუნება
        </button>

        <div className="pageturner_container" style={{ display: "flex" }}>
          <button onClick={() => handlePageChange(page - 1)}> &lt; </button>

          <p>გვერდი: {page}</p>

          <button onClick={() => handlePageChange(page + 1)}> &gt; </button>
        </div>
      </div>
    </div>
  );
}
