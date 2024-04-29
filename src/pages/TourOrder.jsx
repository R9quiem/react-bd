import React, { useState } from "react";
import {useUser} from "../UserContext";
import {Navigate, useNavigate, useParams} from "react-router-dom";


function TourOrderForm() {
  const [formData, setFormData] = useState({
    start_week: '',
    number_of_people: 1
  });
  const {user} = useUser();
  const { tour_id } = useParams();

  const navigate = useNavigate();
  const orderTour = () => {
    fetch('http://localhost:8080/ordered-tours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tour_id: tour_id,
        client_id: user,
        start_week: formData.start_week,
        number_of_people: formData.number_of_people
      }) // Предположим, что вам нужно передать идентификатор тура
    })
  };
  const handleNumberOfPeopleChange = (e) => {
    setFormData({
      ...formData,
      ['number_of_people']: e.target.value
    });
  };
  const handleDateChange = (e) => {
    const weekString = e.target.value;
    setFormData({
      ...formData,
      ['start_week']: weekString
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Вызываем функцию orderTour, передавая количество человек из состояния и идентификатор тура
    orderTour();
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-10 *:w-fit gap-5">
      <label>
        Количество человек:
        <input
          type="number"
          value={formData.number_of_people}
          onChange={handleNumberOfPeopleChange}
          min={1}
          max={10} // Предположим, что максимальное количество человек - 10
          required
          className="ml-2 font-bold border-2 border-black rounded w-10"
        />
      </label>
      <label>
        На какой неделе:
        <input
          type="week"
          value={formData.start_week}
          onChange={handleDateChange}
          required
          className="ml-2 border-2 border-black rounded"
        />
      </label>
      <button type="submit" className="p-2 bg-green-500 rounded border-2 border-black ">Заказать</button>
    </form>
  );
}

export default TourOrderForm;