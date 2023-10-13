//React
import { useEffect, useState } from 'react';

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

//Libraries
import axios from 'axios';
import moment from 'moment';
import "moment/dist/locale/ar-dz"
moment.locale("ar")

const MainContents = () => {
    // States
    const [timings, setTimings] = useState({
        Fajr: "",
        Dhuhr: "",
        Asr: "",
        Maghrib: "",
        Isha: "",
    });

    const [selectedCity, setSelectedCity] = useState({
        displayNAme: "",
        apiName: ""
    })

    const [today, setToday] = useState("");

    const avilableCities = [
        {
            displayNAme: "مسقط",
            apiName: "Muscat"
        },
        {
            displayNAme: "نزوى",
            apiName: "Nizwa"
        },
        {
            displayNAme: "خصب",
            apiName: "Khasab"
        },
        {
            displayNAme: "صلالة",
            apiName: "Salalah"
        }

    ]

    // === States ===

    // API
    const getTimings = async () => {
        const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${selectedCity.apiName}&country=OMN`);
        setTimings({
            Fajr: response.data.data.timings.Fajr,
            Dhuhr: response.data.data.timings.Dhuhr,
            Asr: response.data.data.timings.Asr,
            Maghrib: response.data.data.timings.Maghrib,
            Isha: response.data.data.timings.Isha,
        })
    }

    useEffect(() => {
        getTimings();

        const t = moment();
        setToday(t.format("Do MMM YYYY | h:mm"))
        console.log("the time is: ", t.format("Y"))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCity])

    // === API ===

    const handleCityChange = (e) => {
        const cityObject = avilableCities.find((city) => {
            return city.apiName == e.target.value
        })
        setSelectedCity(cityObject)
    }


    return (
        <>
            {/* Top ROW */}
            <Grid container>
                <Grid xs={6}>
                    <div>
                        <h3>{today}</h3>
                        <h1>{selectedCity.displayNAme}</h1>
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
                <Prayer name="الفجر" time={timings.Fajr} image="/public/fajr-prayer.png" />
                <Prayer name="الظهر" time={timings.Dhuhr} image="/public/dhhr-prayer-mosque.png" />
                <Prayer name="العصر" time={timings.Asr} image="/public/asr-prayer-mosque.png" />
                <Prayer name="المغرب" time={timings.Maghrib} image="/public/sunset-prayer-mosque.png" />
                <Prayer name="العشاء" time={timings.Isha} image="/public/night-prayer-mosque.png" />
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
                        label="Age"
                        onChange={handleCityChange}
                    >
                        {avilableCities.map((city) => {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <MenuItem value={city.apiName}>{city.displayNAme}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Stack >
            {/* === SELECT CITY === */}
        </>
    )
}

export default MainContents