import { useState } from "react"

const Tour = ({id,nnaem,info,image,price,removetours}) => {
    const [readmore , setreadmore] = useState(false);
    return (
        <div className="tour_gen">
            <div className="img_container">
               <img src={image}></img>
            </div>
            <div className="flexdiv">
                <p>{nnaem}</p>
                <p>{price}</p>
            </div>
            <p>{readmore ? info : `${info.substring(0,300)}`}</p>
            <button onClick={() => setreadmore(!readmore)}> 
                {readmore ? 'show less' : "read more"}
            </button>
            <button className="delete_tour" onClick={() => removetours(id)}>not interested</button>
        </div>
    )
}


export default Tour