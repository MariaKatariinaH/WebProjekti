import { useState, useEffect } from "react";
import "./mytasks.scss";
import { IActivity, ICreateActivityDto, ICreateMyTaskDto } from "../../types/global.typing";

import {
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";

const AddMyTask = () => {
  const [mytask, setMyTask] = useState<ICreateMyTaskDto>({
    name: "",
    content: "",
    startDate: "",
    endDate: "",
    status: "",
    statusTheme: "",
    tag: "",
    tagTheme: "",
    activityId: "",
  });
  const [activities, setActivities] = useState<IActivity[]>([]);

  const redirect = useNavigate();

  //Get list of activities:
  useEffect(() => {
    httpModule
      .get<IActivity[]>("http://localhost:5004/api/Activity/Get")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        alert("Error fetching activities");
        console.log(error);
      });
  }, []);

  

  const handleClickSaveBtn = () => {
    if (
      mytask.name === "" ||
      mytask.content === "" ||
      mytask.startDate === "" ||
      mytask.endDate === "" ||
      mytask.status === "" ||
      mytask.statusTheme === "" ||
      mytask.tag === "" ||
      mytask.tagTheme === "" ||
      mytask.activityId === ""
    ) {
      alert("Fill all fields");
      return;
      
    }

    
    console.log("Data", mytask);
    httpModule
      .post("http://localhost:5004/api/MyTask/Create", mytask)
      .then((response) => redirect("/mytasks"))
      .catch((error) => console.log(error));
  };
  const handleClickBackBtn = () => {
    redirect("/mytasks");
  };

  return (
    <div className="content">
      <div className="add-mytask">
        <h2>Add New Task</h2>
        <TextField
          autoComplete="off"
          label="Task Name"
          variant="outlined"
          value={mytask.name}
          onChange={(e) => setMyTask({ ...mytask, name: e.target.value })}
        />
        <TextField
          autoComplete="off"
          label="Task Content"
          variant="outlined"
          value={mytask.content}
          onChange={(e) => setMyTask({ ...mytask, content: e.target.value })}
        />
        <TextField
          autoComplete="off"
          label="Start Date"
          placeholder="YYYY-MM-DD"
          variant="outlined"
          value={mytask.startDate}
          onChange={(e) => setMyTask({ ...mytask, startDate: e.target.value })}
        />
        <TextField
          autoComplete="off"
          label="End Date"
          placeholder="YYYY-MM-DD"
          variant="outlined"
          value={mytask.endDate}
          onChange={(e) => setMyTask({ ...mytask, endDate: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={mytask.status}
            label="Status"
            onChange={(e) => setMyTask({ ...mytask, status: e.target.value })}
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="InProgress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
            <MenuItem value="NotDoingIt">Not Doing It</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Status Theme</InputLabel>
          <Select
            value={mytask.statusTheme}
            label="Status Theme"
            onChange={(e) =>
              setMyTask({ ...mytask, statusTheme: e.target.value })
            }
          >
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="yellow">Yellow</MenuItem>
            <MenuItem value="pink">Pink</MenuItem>
            <MenuItem value="red">Red</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Tag</InputLabel>
          <Select
            value={mytask.tag}
            label="Tag"
            onChange={(e) => setMyTask({ ...mytask, tag: e.target.value })}
          >
            <MenuItem value="sport">Sport</MenuItem>
            <MenuItem value="course">Course</MenuItem>
            <MenuItem value="responsibilities">Responsibilities</MenuItem>
            <MenuItem value="fun">Fun</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Tag Theme</InputLabel>
          <Select
            value={mytask.tagTheme}
            label="Tag Theme"
            onChange={(e) => setMyTask({ ...mytask, tagTheme: e.target.value })}
          >
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="yellow">Yellow</MenuItem>
            <MenuItem value="pink">Pink</MenuItem>
            <MenuItem value="red">Red</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Activity</InputLabel>
          <Select
            value={mytask.activityId}
            label="Activity"
            onChange={(e) =>
              setMyTask({ ...mytask, activityId: e.target.value })
            }
          >
            {activities.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMyTask;
