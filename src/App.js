import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import TourCard from "./TourCard";
import {getOrderedTours, getTours} from "./api/api";
import Main from "./pages/Main";
import Header from "./pages/Header";
import {UserContext, UserProvider} from "./UserContext";
import Auth from "./pages/Auth";
import TourOrder from "./pages/TourOrder";
import Flights from "./pages/Flights";
import Dashboard from "./pages/Dashboard";

function App() {
    const [isAuthModalOpen,setIsAuthModalOpen] = useState(false);
    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () =>setIsAuthModalOpen(false);
  return (
      <UserProvider>
          <BrowserRouter>
              <Header openAuthModal={openAuthModal}/>
              <Auth isOpen={isAuthModalOpen} close={closeAuthModal}/>
              <Routes>
                <Route path='/' Component={Main}/>
                <Route path='/tour-order/:tour_id' Component={TourOrder}/>
                <Route path='/flights' Component={Flights}/>
                <Route path='/dashboard' Component={Dashboard}/>
              </Routes>
          </BrowserRouter>
      </UserProvider>
  );
}

export default App;
