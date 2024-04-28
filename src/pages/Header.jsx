import {NavLink} from "react-router-dom";

export default function Header(){
    return (
        <header className="bg-black  h-20 ">
            <nav className="flex relative gap-5 mx-auto h-full w-4/5 items-center  *:text-white *:rounded *:p-2">
                <NavLink to='/'>Туры</NavLink>
                <NavLink to='/flights'>Полеты</NavLink>
                <NavLink to='/dashboard'>Личный кабинет</NavLink>
                <NavLink to='/tests'>Тестирование запросов</NavLink>
                <NavLink className="right-0 absolute" to='/auth'>Войти</NavLink>
            </nav>
        </header>
    )
}