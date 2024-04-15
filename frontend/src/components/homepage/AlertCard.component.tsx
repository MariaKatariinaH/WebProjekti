import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Miina from "../../images/Miina.jpg";

export default function AlertCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <a
          href="https://fi.wikipedia.org/wiki/Eestinajokoira"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CardMedia
            component="img"
            height="500"
            image={Miina}
            alt="tuijottava miina"
          />
        </a>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Miina
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Take estonian hound Miina out every day, many times a day. Otherwise
            she will put pressure on you by staring.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
