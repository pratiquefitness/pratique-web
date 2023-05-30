import { ButtonTabBar, TabBarContainer } from "./style";

import Home from "../../assets/icones/tabbar/home.svg";
import Workout from "../../assets/icones/tabbar/workout.svg";
import Central from "../../assets/icones/tabbar/central.svg";
import Points from "../../assets/icones/tabbar/points.svg";
import Profile from "../../assets/icones/tabbar/profile.svg";
import CentralBackground from "../../assets/icones/tabbar/central-background.svg";

function TabBar() {
  return (
    <TabBarContainer>
      <ButtonTabBar to="/">
        <img src={Home} alt="Home" />
        <p>Início</p>
      </ButtonTabBar>
      <ButtonTabBar to="/workouts">
        <img src={Workout} alt="Workout" />
        <p>Treinos</p>
      </ButtonTabBar>
      <ButtonTabBar to="/fitday">
        <img
          style={{
            backgroundImage: `url(${CentralBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          src={Central}
          alt="Central"
        />
      </ButtonTabBar>
      <ButtonTabBar to="/points">
        <img src={Points} alt="Points" />
        <p>Pontos</p>
      </ButtonTabBar>
      <ButtonTabBar to="/profile">
        <img src={Profile} alt="Profile" />
        <p>Perfil</p>
      </ButtonTabBar>
    </TabBarContainer>
  );
}

export default TabBar;
