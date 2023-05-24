import { useState } from "react";
import Phone from "./Phone";

const Container = ({lst,remove,up,down,clear}) =>{
    var numofitems = 0;
    var fullprice = 0;
    for(const item of lst){
        numofitems = numofitems + item.count
        fullprice = fullprice + item.count * item.price
    }
    
    return (<div>
        <div className="header">
            
                <div><p className="applala">c a r t  a p p </p></div>
            
            
                <div><p className="numofitems">{numofitems}</p></div>
            
        </div>
        <div className="phone_container">
            <p className="yourbag">your bag</p>
        {lst.map((el) => {
            return <Phone remove={remove} up={up} down={down} id = {el.id} Nname = {el.name} price = {el.price} pic = {el.pic} count = {el.count}></Phone>
        })}
    </div>
    <div className="footer">
        <div className="line"></div>
        <div className="total_price_holder">
            <p>total</p>
            <p className="price_h">{fullprice}</p>
        </div>
        <button className="clear_everything" onClick={() => clear()}>clear cart</button>
    </div>
    </div>)
}

export default Container;