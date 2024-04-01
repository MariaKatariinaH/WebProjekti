import { useState } from "react";
import "./activities.scss";
import { ICreateActivityDto } from "../../types/global.typing";
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

const AddActivity = () => {
  const [activity, setActivity] = useState<ICreateActivityDto>({
    name: "",
    description: "",
    activityType: "",
    status: "",
    statusTheme: "",
    tag: "",
    tagTheme: "",
  });
  const redirect = useNavigate();

  const handleClickSaveBtn = () => {
    if (
      activity.name === "" ||
      activity.description === "" ||
      activity.activityType === "" ||
      activity.status === "" ||
      activity.statusTheme === "" ||
      activity.tag === "" ||
      activity.tagTheme === ""
    ) {
      alert("Fill all fields");
      return;
    }
    httpModule
      .post("http://localhost:5004/api/Activity/Create", activity)
      .then((response) => redirect("/activities"))
      .catch((error) => console.log(error));
  };
  const handleClickBackBtn = () => {
    redirect("/activities");
  };

  return (
    <div className="content">
      <div className="add-activity">
        <h2>Add New Activity</h2>
        <TextField
          autoComplete="off"
          label="Activity Name"
          variant="outlined"
          value={activity.name}
          onChange={(e) => setActivity({ ...activity, name: e.target.value })}
        />
        <TextField
          autoComplete="off"
          label="Activity Description"
          variant="outlined"
          value={activity.description}
          onChange={(e) =>
            setActivity({ ...activity, description: e.target.value })
          }
        />
        <FormControl fullWidth>
          <InputLabel>Activity Type</InputLabel>
          <Select
            value={activity.activityType}
            label="Activity Type"
            onChange={(e) =>
              setActivity({ ...activity, activityType: e.target.value })
            }
          >
            <MenuItem value="Hobby">Hobby</MenuItem>
            <MenuItem value="School">School</MenuItem>
            <MenuItem value="Job">Job</MenuItem>
            <MenuItem value="Home">Home</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={activity.status}
            label="Status"
            onChange={(e) =>
              setActivity({ ...activity, status: e.target.value })
            }
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
            value={activity.statusTheme}
            label="Status Theme"
            onChange={(e) =>
              setActivity({ ...activity, statusTheme: e.target.value })
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
            value={activity.tag}
            label="Tag"
            onChange={(e) => setActivity({ ...activity, tag: e.target.value })}
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
            value={activity.tagTheme}
            label="Tag Theme"
            onChange={(e) =>
              setActivity({ ...activity, tagTheme: e.target.value })
            }
          >
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="yellow">Yellow</MenuItem>
            <MenuItem value="pink">Pink</MenuItem>
            <MenuItem value="red">Red</MenuItem>
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

export default AddActivity;