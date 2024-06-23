import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "./utilities";
import GradientBackgroundComponent from "./components/GradientBackground";
import Header from "./components/Header";

function App() {
  const [user, setUser] = useState(null);
  const getInfo = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      let response = await api.get("users/");
      setUser(response.data.user);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <>
      <GradientBackgroundComponent>
        <Outlet context={{ user, setUser }} />
      </GradientBackgroundComponent>
    </>
  );
}

export default App;
