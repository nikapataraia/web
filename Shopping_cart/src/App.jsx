import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Container from './Container'
const lst = [
  {name : "google pixel" , price : 499.99, pic : "https://www.android.com/intl/en_au/static/2016/img/devices/phones/pixel/silver-1_w_1x.jpg"},
  {name : "xiaomi redmi note 2" , price : 699.99, pic : "https://allmarket.ge/u/14/96/04/WwVwhcvhgkejO5PnPzwGKg/cccc7127-2c1b-416b-ac0e-974f3eddffc7.jpg"},
  {name : "samsung galaxy s7" , price : 599.99, pic : "https://usmobi.ge/wp-content/uploads/2021/03/samsung-galaxy-s7-black-1-1.jpg"}
]
function App() {
  const [items , setitems] = useState([])
  const [loading,setloading] = useState(true)
  var tmplst = lst.map((item, index) => {
  return {
    id : index + 1,
    count : 1,
    name: item.name,
    price : item.price,
    pic: item.pic,
  };
  });
  
  async function copyList() {
  await new Promise(resolve => setTimeout(resolve, 5000)); 
  setitems(tmplst);
  setloading(false); 
 }
 
 useEffect(()=>{
    copyList();
  } , [])

const remove_item = (id) => {

  const newt = items.filter((el) => el.id !== id);
  setitems(newt)
}

const upone = (id) => {
  const newt = items.map((el) => {if(el.id === id){return {...el , count: el.count + 1}} else {return el}})
  setitems(newt)
}

const downone = (id) => {
  const newt = items.map((el) => {
    if(el.id === id){ 
      if(el.count > 1){
      return {...el , count: el.count - 1}
    }
      else {
        return null
      }}
    else {return el}}).filter(Boolean)
  // if(cnt === 0){
  //   remove_item(id)
  //   return 
  // }
  setitems(newt)
}
const clear = () =>{
 setitems([])
}


  if(loading){
    return (<div>loading...</div>)
  }
  return (<Container clear={clear} lst = {items} remove={remove_item} up={upone} down={downone}></Container>)
}

export default App
