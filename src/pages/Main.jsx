import TourCard from "../TourCard";
import {useEffect, useState} from "react";
import {useUser} from "../UserContext";
import OrderedTourCard from "../OrderedTourCard";

export default function Main() {
    const [tours,setTours] = useState([]);
    const [clientTours,setClientTours] = useState([]);
    const { user } = useUser();
    useEffect(() => {
        fetch('http://localhost:8080/tours')
            .then((res)=>res.json())
            .then((data)=>setTours(data));
        if (user) {

            fetch(`http://localhost:8080/client-tours?client_id=${user}`)
              .then((res) => res.json())
              .then((data) => setClientTours(data));
        }
    }, [user]);

    return (
      <main className=" w-4/5 mx-auto mt-10 flex flex-col gap-10">
        <p>Туры:</p>
        <ul className="flex flex-col gap-4">{tours.map((tour) => <TourCard tour={tour}/>)}</ul>
        <p>Ваши туры:</p>
        <ul className="flex flex-col gap-4">{clientTours.map((tour) => <OrderedTourCard tour={tour}/>)}</ul>
      </main>
    )
}