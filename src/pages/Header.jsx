import {NavLink} from "react-router-dom";
import {useUser} from "../UserContext";

export default function Header({openAuthModal}){
  const {user,logout} = useUser();
    return (
        <header className="bg-black  h-20 ">
            <nav className="flex relative gap-5 mx-auto h-full w-4/5 items-center  *:text-white *:rounded *:p-2">
                <NavLink to='/'>Туры</NavLink>
                <NavLink to='/flights'>Полеты</NavLink>
                <NavLink to='/dashboard'>Личный кабинет</NavLink>
                <NavLink to='/tests'>Тестирование запросов</NavLink>
              <div className="right-0 absolute">
                {user
                  ? <div>
                    <span>Ваш id: {user}</span> | <button onClick={logout}>Выход</button>
                </div>
                  : <button  onClick={openAuthModal}>Зарегистрироваться</button>}
              </div>
            </nav>
        </header>
    )
}