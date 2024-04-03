import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/navbar/Navbar.component";
import { Routes, Route } from "react-router-dom";
import CustomLinearProgress from "./components/custom-linear-progress/CustomLinearProgress.component";
//import UpdateActivity from "./pages/activities/UpdateActivity.page";
//import DeleteActivity from "./pages/activities/DeleteActivity.page";
//import MyTasks from "./pages/mytasks/MyTasks.page";

//Let's try importing with lazy loading:
const Home = lazy(() => import("./pages/home/Home.page"));
const Activities = lazy(() => import("./pages/activities/Activities.page"));
const AddActivity = lazy(() => import("./pages/activities/AddActivity.page"));
const UpdateActivity = lazy(
  () => import("./pages/activities/UpdateActivity.page")
);
const DeleteActivity = lazy(
  () => import("./pages/activities/DeleteActivity.page")
);
const MyTasks = lazy(() => import("./pages/mytasks/MyTasks.page"));
const AddMyTask = lazy(() => import("./pages/mytasks/AddMyTask.page"));

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyles = darkMode ? "app dark" : "app";

  return (
    <div className={appStyles}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLinearProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities">
              <Route index element={<Activities />} />
              <Route path="add" element={<AddActivity />} />
              <Route path="update/:id" element={<UpdateActivity />} />
              <Route path="delete/:id" element={<DeleteActivity />} />
            </Route>
            <Route path="/mytasks">
              <Route index element={<MyTasks />} />
              <Route path="add" element={<AddMyTask />} />

            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
