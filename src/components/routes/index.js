import { Route, Routes } from "react-router-dom";

// LOGIN PAGE
import Login from "../pages/Login";

// SIGNED PAGES
import Home from "../pages/Home";
import Workouts from "../pages/Workouts";
import FitDay from "../pages/FitDay";
import Points from "../pages/Points";
import Profile from "../pages/Profile";
import Recomendations from "../pages/Recomendations";
import DaysExercises from "../pages/DaysExercises";
import ChangeExercises from "../pages/ChangeExercises";
import WorkoutC from "../pages/WorkoutC";
import DaysWorkout from "../pages/DaysWorkout";
import EvaluateInstructor from "../pages/EvaluateInstructor";
import CompleteWorkout from "../pages/CompleteWorkout";
import ExercisesList from "../pages/ExercisesList";
import Historico from "../pages/Historico";
import { useAuth } from "../../hooks";

const DefaultRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Login />} />
    <Route path="*" element={<Login />} />
  </Routes>
);

const SignedRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/workouts" element={<Workouts />} />
    <Route exact path="/fitday" element={<FitDay />} />
    <Route exact path="/points" element={<Points />} />
    <Route exact path="/profile" element={<Profile />} />
    <Route exact path="/historico" element={<Historico />} />
    <Route exact path="/recommendations" element={<Recomendations />} />
    <Route exact path="/days-exercises" element={<DaysExercises />} />
    <Route exact path="/exercises/list" element={<ExercisesList />} />
    <Route exact path="/exercises/change" element={<ChangeExercises />} />
    {/* <Route exact path="exercises">
            <Route
              exact
              path="change/:exercise"
              element={<ChangeExercises />}
            /> */}
    {/* <Route exact path="list" element={<ExercisesList />} /> */}
    {/* </Route> */}
    {/* <Route exact path="/change-exercises" element={<ChangeExercises />} /> */}
    <Route exact path="/workout-c" element={<WorkoutC />} />
    <Route exact path="/days-workout" element={<DaysWorkout />} />
    <Route exact path="/evaluate-instructor" element={<EvaluateInstructor />} />
    <Route exact path="/complete-workout" element={<CompleteWorkout />} />
  </Routes>
);

const GetRoutes = () => {
  const auth = useAuth();
  return auth.signed ? <SignedRoutes /> : <DefaultRoutes />;
};

export default GetRoutes;
