const Phone = ({Nname , price , pic , count , id , remove , up , down}) => {
    return (<div className="phone_holder">
        <div> <img src={pic}></img> </div>
        <div className="info">
            <p>{Nname}</p>
            <p className="price_tt">{price}</p>
            <button className="remove_but" onClick={()=> remove(id)}> remove </button>
        </div>
        <div className="counter">
            <button onClick={() => up(id)}> ^ </button>
            <p>{count}</p>
            <button className="down_arr" onClick={() => down(id)}> ^ </button>
        </div>
    </div>)
}

export default Phone