import { useEffect, useState } from "react";

const Profile_holder = ({prof_list, next , prev , rando , curid}) =>{
    const [our_el, set_el] = useState(prof_list[curid-1])
    useEffect(() => {
        set_el(prof_list[curid-1])
    })
    return (<div className="main"> 
    <div className="img_holder"><img className="img" src={our_el.image}></img></div>
    <p className="name"> { our_el.name}</p>
    <p className="job">{our_el.job}</p>
    <p className="text">{our_el.text}</p>
    <div>
        <button className="prev" onClick={() => prev()}> &lt; </button>
        <button className="next" onClick={() => next()}> &gt; </button>
    </div>
    <button className="rand" onClick={() => rando()}>surprise me</button>
    </div>)
}

export default Profile_holder;