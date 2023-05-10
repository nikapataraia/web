import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Loading from './Loading';
import Tour from './tour';
import Tours from './tours'

const api_link = 'https://course-api.com/react-tours-project';
function App() {
  const [loadding, setloading] = useState(true)
  const [tours,settours] = useState([])

  const removetours_f = (id) => {
    const newt = tours.filter((tr) => tr.id !== id);
    settours(newt);
  };

  const fetchdat = async () => {
  setloading(true);
  fetch(api_link)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      settours(data);
      setloading(false);
      console.log('fetched')
    });
   };
  useEffect(()=>{
    fetchdat();
  } , [])


  if(tours.length === 0){
    return (
      <div>
        <h1>no tours left</h1>
        <button onClick={fetchdat}>refresh</button>

        <h2>did not have time for finishing css :DDD</h2>
      </div>
    );
  }
  if(loadding){
      return <Loading></Loading>
    }

  return (
    <Tours tours={tours} removetours={removetours_f}></Tours>
  );
}

export default App
