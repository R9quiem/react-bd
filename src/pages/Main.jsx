import TourCard from "../TourCard";
import {useEffect, useState} from "react";
import {useUser} from "../UserContext";
import OrderedTourCard from "../OrderedTourCard";

export default function Main() {
    const [tours,setTours] = useState([]);
    const [cities,setCities] = useState([]);
    const [clientTours,setClientTours] = useState([]);
    const [datePeriod, setDatePeriod] = useState({
      start: null,
      end: null
    });
    const [isFilter, setIsFilter] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [refunds,setRefunds]=useState([])
    const { user } = useUser();
    useEffect(() => {
        fetch('http://localhost:8080/tours')
          .then((res) => res.json())
          .then((data) => setTours(data));
        fetch('http://localhost:8080/cities')
          .then((res)=>res.json())
          .then((data)=>setCities(data));
      fetch('http://localhost:8080/refunds')
        .then((res)=>res.json())
        .then((data)=>setRefunds(data));
        if(user&&isFilter) {
          fetch(`http://localhost:8080/tours-by-date-and-city?city=${selectedCity}&start=${datePeriod.start}&end=${datePeriod.end}`)
            .then((res) => res.json())
            .then((data) => setClientTours(data));
          console.log(tours);
        }
        if (user&&!isFilter) {
            fetch(`http://localhost:8080/client-tours?client_id=${user}`)
              .then((res) => res.json())
              .then((data) => setClientTours(data));
        }
    }, [user, isFilter, selectedCity, datePeriod]);
  const toggleApplyFilters = () => {
    setIsFilter(!isFilter);
  };
  const handleDateChange = (e) => {
    setDatePeriod({
      ...datePeriod,
      [e.target.name]: e.target.value
    });
  };
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };
    return (
      <main className=" w-4/5 mx-auto mt-10 flex flex-col gap-10">
        <h1>Туры:</h1>

        <ul className="flex flex-col gap-4">{tours.map((tour) => <TourCard tour={tour}/>)}</ul>
        <p>Ваши туры:</p>
        <div className="p-2 border-2 border-black w-fit rounded">

          <header className="mb-4">Фильтры:</header>
          <label htmlFor="city-filter">Город: </label>
          <select id="city-filter" className=" border-2 border-black rounded mb-4" onChange={handleCityChange}>
            {cities.map((city) => <option key={city.airport_id}>{city.city}</option>)}
          </select>

          <br/>
          <label>Между: </label>
          <input className=" border-2 border-black rounded" name='start' type="week" value={datePeriod.start}
                 onChange={handleDateChange}/>
          <span> - </span>
          <input className=" border-2 border-black rounded" name='end' type="week" value={datePeriod.end}
                 onChange={handleDateChange}/>
          <br/>
          <label>Фильтры</label>
          <input type="checkbox" className="mt-4 bg-black text-white p-1 rounded" checked={isFilter}
                 onChange={toggleApplyFilters}/>
        </div>
        <ul className="flex flex-col gap-4">{clientTours.map((tour) =>
        {
          console.log(tours, refunds)
          return refunds.some((el) => el.ordered_tour_id === tour.ordered_tour_id) ? null : <OrderedTourCard tour={tour}/>
        })}
        </ul>
      </main>
    )
}