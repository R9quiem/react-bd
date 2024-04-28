import {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";

function TourCard({tour}) {
    const [routes,setRoutes] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8080/tour-routes/${tour.tour_id}`)
            .then((res)=>res.json())
            .then((data)=>setRoutes(data));
    }, []);

    return (
        <li className={`flex gap-4 bg-green-300 p-2 rounded`} key={tour.tour_id}>
            <h1 className="font-bold">Тур №{tour.tour_id}</h1>
            <div>
                <h2><i>Маршрут тура:</i></h2>
                <ol>
                    {routes.map((route,index)=>
                        <li key={route.route_id} className="flex gap-2">
                            <b>{index + 1}.</b>
                            <span>Маршрут: {route.route_id},</span>
                            <span>Откуда: {route.departure_city},</span>
                            <span>Куда: {route.destination_city},</span>
                            <span>Стоимость: {route.ticket_price}р.</span>
                        </li>)}
                </ol>

            </div>
            <div className="items-end justify-end grow flex">
                <Link className=" h-fit bg-green-500 p-2 rounded" to={`/tour-order/${tour.tour_id}`}>Заказать тур</Link>
            </div>
        </li>
    )
}
export default TourCard;