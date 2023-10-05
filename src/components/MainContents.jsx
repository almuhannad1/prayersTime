// Components
import Prayer from './Prayer';

//MUI
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const MainContents = () => {
    return (
        <>
            {/* Top ROW */}
            <Grid container>
                <Grid xs={6}>
                    <div>
                        <h2>سبتمبر 9 2023 | 4:20</h2>
                        <h1>مسقط</h1>
                    </div>
                </Grid>

                <Grid xs={6}>
                    <div>
                        <h2>متبقي حتى صلاة العصر</h2>
                        <h1>1:00:25</h1>
                    </div>
                </Grid>
            </Grid>
            {/* === Top ROW === */}

            <Divider style={{ borderColor: "white", opacity: "0.1" }} />

            {/* PRATERS CARDS */}
            <Stack direction="row" justifyContent={"space-around"} style={{ marginTop: "20px" }}>
                <Prayer name="الفجر" time="04:21" image="/public/fajr-prayer.png" />
                <Prayer name="الظهر" time="04:21" image="/public/dhhr-prayer-mosque.png" />
                <Prayer name="العصر" time="04:21" image="/public/asr-prayer-mosque.png" />
                <Prayer name="المغرب" time="04:21" image="/public/sunset-prayer-mosque.png" />
                <Prayer name="العشاء" time="04:21" image="/public/night-prayer-mosque.png" />
            </Stack>
            {/* === PRATERS CARDS === */}

            {/* SELECT CITY */}
            <Stack direction="row" justifyContent="center" style={{ marginTop: "40px" }}>
                <FormControl style={{ width: "20%" }}>
                    <InputLabel id="demo-simple-select-label"><span style={{ color: "white" }}>المدينة</span> </InputLabel>
                    <Select
                        style={{ color: "white" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value=""
                        label="Age"
                        onChange=""
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            {/* === SELECT CITY === */}
        </>
    )
}

export default MainContents