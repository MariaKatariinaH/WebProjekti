import { useEffect, useState } from "react";
import "./activities.scss";
import httpModule from "../../helpers/http.module";
import { IActivity } from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ActivitiesGrid from "../../components/activities/ActivitiesGrid.component";

const Activities = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IActivity[]>("http://localhost:5004/api/Activity/Get")
      .then((response) => {
        setActivities(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error fetching activities");
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: string) => {
    redirect(`/activities/delete/${id}`);
  };

  const handleUpdate = (id: string) => {
    redirect(`/activities/update/${id}`);
  };

  return (
    <div className="content activities">
      <div className="heading">
        <h2>Activities</h2>
        <Button variant="outlined" onClick={() => redirect("/activities/add")}>
          <Add /> Add Activity
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : activities.length === 0 ? (
        <h1>No Activity</h1>
      ) : (
        <ActivitiesGrid 
          data={activities} 
          onEdit={handleUpdate} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
};

export default Activities;