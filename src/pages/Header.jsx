import {NavLink} from "react-router-dom";
import {useUser} from "../UserContext";

export default function Header({openAuthModal}){
  const {user,logout} = useUser();
    return (
        <header className="bg-black h-20 ">
            <nav className="flex relative gap-5 mx-auto w-4/5 *:py-7 *:rounded-tl-xl *:rounded-tr-xl *:font-bold *:h-full  *:p-2">
                <NavLink exact to='/'  className={({ isActive}) => isActive ? "bg-white" : "text-white"}>Туры</NavLink>
                <NavLink to='/flights' className={({ isActive}) => isActive ? "bg-white" : "text-white"}>Полеты</NavLink>
                <NavLink to='/dashboard' className={({ isActive}) => isActive ? "bg-white" : "text-white"}>Личный кабинет</NavLink>
                <NavLink to='/tests' className={({ isActive}) => isActive ? "bg-white" : "text-white"}>Тестирование запросов</NavLink>
              <div className="right-0 absolute *:text-white">
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