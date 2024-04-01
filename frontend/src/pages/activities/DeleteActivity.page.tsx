import { useEffect } from "react";
import "./activities.scss";
import { useParams } from "react-router-dom";
import httpModule from "../../helpers/http.module";
import { useNavigate } from "react-router-dom";

const DeleteActivity = () => {
  const { id } = useParams();
  const redirect = useNavigate();

  useEffect(() => {
    const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete this activity?")) {
        httpModule
          .delete(`http://localhost:5004/api/Activity/Delete/${id}`)
          .then((response) => redirect("/activities"))
          .catch((error) => console.log(error));
      } else {
        redirect("/activities");
      }
    };
    handleDelete();
  }, [id, redirect]);

  //Window for confirming is enough:
  return null;
};

export default DeleteActivity;
