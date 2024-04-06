import { useEffect } from "react";
import "./mytasks.scss";
import { useParams } from "react-router-dom";
import httpModule from "../../helpers/http.module";
import { useNavigate } from "react-router-dom";

const DeleteActivity = () => {
  const { id } = useParams();
  const redirect = useNavigate();

  useEffect(() => {
    const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete this task?")) {
        httpModule
          .delete(`http://localhost:5004/api/MyTask/Delete/${id}`)
          .then((response) => redirect("/mytasks"))
          .catch((error) => console.log(error));
      } else {
        redirect("/mytasks");
      }
    };
    handleDelete();
  }, [id, redirect]);

  //Window for confirming is enough, nothing else to return:
  return null;
};

export default DeleteActivity;
