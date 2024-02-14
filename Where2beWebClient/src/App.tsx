import { useEffect, useState } from "react";
import { Home } from "./components/Home";
import { Welcome } from "./components/Welcome";
import { useCookies } from "react-cookie";



function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['email', 'accessToken']);


  return (
    <div>
      {cookies.email && cookies.accessToken ? <Home/> : <Welcome />}
    </div>
  );
}

export default App;
