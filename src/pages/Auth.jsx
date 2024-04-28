import React, {useContext, useState} from "react";
import {useUser} from "../UserContext";

export default function Auth({isOpen,close}){
    const [authType, setAuthType] =useState('registration');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { setUser } = useUser();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (authType === 'registration') {
            try {
                const response = await fetch('http://localhost:8080/registration', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {

                    const  client_id  = await response.json();
                    console.log("успешно", client_id)
                    localStorage.setItem('client_id', client_id);
                    setUser(client_id);
                } else {
                    console.error('Ошибка при регистрации');
                }
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        } else {
            try {
                // Для запроса GET добавляем параметры в URL
                const queryString = `?email=${formData.email}&password=${formData.password}`;
                const response = await fetch(`http://localhost:8080/login${queryString}`);

                if (response.ok) {

                    const  client_id  = await response.json();

                    localStorage.setItem('client_id', client_id);
                    setUser(client_id);

                } else {
                    console.error('Ошибка при входе');
                }
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        }
        close();
    };

    const toggleAuthType = () => {
        setAuthType(authType==='registration' ? 'login' : 'registration');
    }
    return (
        <div className={`absolute h-full w-full top-0 ${isOpen ? '' : 'hidden'}`}>
            <div
              className="bg-white absolute top-1/2 left-1/2 w-1/6 -translate-x-1/2  rounded-xl p-14 -translate-y-1/2 border-2 border-black">
                <button className="absolute top-3 right-5 p-2" onClick={close}>x</button>
                <form className="flex flex-col items-center space-y-4 mb-4" onSubmit={handleSubmit}>
                    <h1>{authType === 'registration' ? 'Регистрация' : 'Вход' }</h1>
                    {authType === 'registration' && (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Имя"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                    )}
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="border border-gray-400 p-2 rounded-md"
                    />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Пароль"
                      className="border border-gray-400 p-2 rounded-md"
                    />
                    {authType === 'registration' && (
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Повторите пароль"
                        className="border border-gray-400 p-2 rounded-md"
                      />
                    )}
                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md">
                        {authType === 'registration' ? 'Зарегистрироваться' : 'Войти'}
                    </button>
                </form>
                <button className="absolute left-1/2 bottom-10 -translate-x-1/2 *:text-blue-600 *:underline" onClick={toggleAuthType}>
                    {authType === 'registration' ? <span>Вход</span> : <span>Регистрация</span>}
                </button>
            </div>
        </div>
    )
}