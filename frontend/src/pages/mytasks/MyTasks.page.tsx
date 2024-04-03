import { useEffect, useState } from "react";
import "./mytasks.scss";
import httpModule from "../../helpers/http.module";
import { IMyTask } from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MyTasksGrid from "../../components/mytasks/MyTasksGrid.component";

const MyTasks = () => {
  const [mytasks, setMyTasks] = useState<IMyTask[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IMyTask[]>("http://localhost:5004/api/MyTask/Get")
      .then((response) => {
        setMyTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error fetching activities");
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: string) => {
    redirect(`/mytasks/delete/${id}`);
  };

  const handleUpdate = (id: string) => {
    redirect(`/mytasks/update/${id}`);
  };

  return (
    <div className="content mytasks">
      <div className="heading">
        <h2>Tasks</h2>
        <Button variant="outlined" onClick={() => redirect("/mytasks/add")}>
          <Add /> Add Task
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : mytasks.length === 0 ? (
        <h1>No Task</h1>
      ) : (
        <MyTasksGrid
          data={mytasks}
          onEdit={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default MyTasks;
