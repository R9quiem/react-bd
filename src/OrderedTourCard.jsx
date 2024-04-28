import {useEffect, useState} from "react";

function OrderedTourCard({tour}) {
  const [flights,setFlights] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/ordered-tour-flights/${tour.tour_id}`)
      .then((res)=>res.json())
      .then((data)=>setFlights(data));
  }, []);
  return (
    <li className={`flex gap-4 bg-green-300 p-2 rounded`} key={tour.tour_id}>
      <h1 className="font-bold">Тур №{tour.tour_id}</h1>
      <div>
        <h2><i>Маршрут тура:</i></h2>
        <ol>
          {flights.map((flight,index)=>
            <li key={flight.flight_id} className="flex gap-2">
              <b>{index + 1}.</b>
              <span>Маршрут: {flight.route_id},</span>
              <span>Откуда: {flight.departure_city},</span>
              <span>Куда: {flight.destination_city},</span>
              <span>Стоимость: {flight.ticket_price}р.</span>
              <span>Вылет: '{flight.departure_date}'</span>
            </li>)}
        </ol>

      </div>

    </li>
  )
}
export default OrderedTourCard;