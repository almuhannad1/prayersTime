import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

// eslint-disable-next-line react/prop-types
export default function ActionAreaCard({ name, time, image }) {
    return (
        <Card sx={{ width: "13vw", height: "22vw" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                />
                <CardContent>
                    <h2>{name}</h2>

                    <h1 style={{ fontWeight: "normal" }}>{time}</h1>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
