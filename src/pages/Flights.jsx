import React, { useState, useEffect } from 'react';

const Flights = () => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState([]);

  const fetchFlights = async () => {
    try {
      const response = await fetch(`http://localhost:8080/flights?destination=${destination}&date=${date}`);
      const data = await response.json();
      setFlights(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, [destination, date]);

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className="w-4/5 mx-auto flex flex-col gap-2">
      <h1>Поиск рейсов:</h1>
      <div>
        <label>
          Город назначения:
          <input
            type="text"
            value={destination}
            onChange={handleDestinationChange}
          />
        </label>
      </div>
      <div>
        <label>
          Дата вылета:
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
          />
        </label>
      </div>
      <h2>Список рейсов</h2>
      <table className="border-2 border-black border-collapse ">
        <thead>
        <tr>
          <th>№ Рейса</th>
          <th>Город назначения</th>
          <th>Вместимость</th>
          <th>Свободные места</th>
        </tr>
        </thead>
        <tbody>
        {flights.map(flight => (
          <tr key={flight.flight_id}>
            <td>{flight.flight_id}</td>
            <td>{flight.destination_city}</td>
            <td>{flight.capacity}</td>
            <td>{flight.free_seats}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Flights;