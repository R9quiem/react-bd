import TourCard from "../TourCard";
import {useEffect, useState} from "react";

export default function Main() {
    const [tours,setTours] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/tours')
            .then((res)=>res.json())
            .then((data)=>setTours(data));
    }, []);
    return (
        <main className=" w-4/5 mx-auto mt-10 flex flex-col gap-10">
            <p className="">Туры:</p>
            <ul className="flex flex-col gap-4">{tours.map((tour) => <TourCard tour={tour}/>)}</ul>
            <p>Ваши туры:</p>
        </main>
    )
}