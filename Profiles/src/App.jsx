import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Profile_holder from './profile_holder'
const lst = [{id:1,
  name:'Susan Smith',
  job:'web developer',
  image:'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg',
  text:"I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",},
{id:2,name:'Anna Johnson',job:'web designer',image:'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg',text:'Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.',},{id:3,name:'Peter Jones',job:'intern',image:'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg',text:'Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.',},{id:4,name:'Bill Anderson',job:'the boss',image:'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg',text:'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',},]



function App() {
  const [full_list,setlist] = useState([]);
  useEffect(()=>{
		setlist(lst);
	}, []);

  const [cur_id, set_id] = useState(1)

  const next_id = () => {
    if(cur_id === full_list.length){
      set_id(1)
    }
    else{
      set_id(cur_id + 1)
    }
  }

  const prev_id = () => {
    if(cur_id === 1){
      set_id(full_list.length)
    }
    else{
      set_id(cur_id - 1)
    }
  }

  const rand_id = () => {
    const randomIndex = Math.floor(Math.random() * full_list.length);
    set_id(randomIndex + 1)
  }
  return (<Profile_holder prof_list={lst} next={next_id} prev={prev_id} rando={rand_id} curid={cur_id}></Profile_holder>)
}

export default App
