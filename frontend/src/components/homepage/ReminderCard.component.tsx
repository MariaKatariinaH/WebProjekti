import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Duudi1 from "../../images/Duudi1.jpg";

export default function ReminderCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <a
          href="https://www.ratsastus.fi/lajit/lannenratsastus/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CardMedia component="img" height="500" image={Duudi1} alt="duudi" />
        </a>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Western Riding
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Do western riding as much as you can.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
