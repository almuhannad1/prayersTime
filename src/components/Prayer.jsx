import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

// eslint-disable-next-line react/prop-types
export default function ActionAreaCard({ name, time, image }) {
    return (
        <Card sx={{ width: "14vw" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                />
                <CardContent>
                    <h4>{name}</h4>

                    <Typography variant="h3" gutterBottom>{time}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
