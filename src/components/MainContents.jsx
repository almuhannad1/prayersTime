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
    const [nextPrayerIndex, setNextPrayerIndex] = useState(1)

    const [timings, setTimings] = useState({
        Fajr: "04:50",
        Dhuhr: "11:59",
        Asr: "15:18",
        Maghrib: "17:49",
        Isha: "19:01",
    });

    const [remainingTime, setRemainingTime] = useState("")

    const [selectedCity, setSelectedCity] = useState({
        displayNAme: "مسقط",
        apiName: "Muscat"
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
            displayNAme: "صلالة",
            apiName: "Salalah"
        }
    ]

    const prayersArray = [
        { key: "Fajr", displayName: "الفجر" },
        { key: "Dhuhr", displayName: "الظهر" },
        { key: "Asr", displayName: "العصر" },
        { key: "Maghrib", displayName: "المغرب" },
        { key: "Isha", displayName: "العشاء" },
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCity])

    // === API ===

    useEffect(() => {
        let interval = setInterval(() => {
            setupCountdownTime()
        }, 1000)

        const t = moment();
        setToday(t.format("Do MMM YYYY | h:mm"));

        return () => {
            clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timings])

    const setupCountdownTime = () => {
        const momentNow = moment();
        let prayerIndex = 2
        console.log(momentNow)
        if (momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) && momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))) {
            prayerIndex = 1
        } else if (momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) && momentNow.isBefore(moment(timings["Asr"], "hh:mm"))) {
            prayerIndex = 2
        } else if (momentNow.isAfter(moment(timings["Asr"], "hh:mm")) && momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))) {
            prayerIndex = 3
        } else if (momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) && momentNow.isBefore(moment(timings["Isha"], "hh:mm"))) {
            prayerIndex = 4
        } else {
            prayerIndex = 0
        }

        setNextPrayerIndex(prayerIndex)

        // now after knowing what the next prayer is, we can setup the countdown timer by getting the prayer's time
        const nextPrayerObject = prayersArray[prayerIndex]
        const nextPrayerTime = timings[nextPrayerObject.key]
        const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm")

        let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow)

        if (remainingTime < 0) {
            const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow)
            const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
                moment("00:00:00", "hh:mm:ss")
            )

            const totalDiffernce = midnightDiff + fajrToMidnightDiff

            remainingTime = totalDiffernce
        }

        const durationRemaingTime = moment.duration(remainingTime)

        setRemainingTime(`${durationRemaingTime.seconds()} : ${durationRemaingTime.minutes()} : ${durationRemaingTime.hours()}`)

    }

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
                        <h2>متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
                        <h1>{remainingTime}</h1>
                    </div>
                </Grid>
            </Grid>
            {/* === Top ROW === */}

            <Divider style={{ borderColor: "white", opacity: "0.1" }} />

            {/* PRATERS CARDS */}

            <Stack direction='row' justifyContent={"space-around"} style={{ marginTop: "20px" }}>
                <Grid xs={2}>
                    <Prayer name="الفجر" time={timings.Fajr} image="public/asr-prayer-mosque.png" />
                </Grid>
                <Grid xs={2}>
                    <Prayer name="الظهر" time={timings.Dhuhr} image="dhhr-prayer-mosque.png" />
                </Grid>
                <Grid xs={2}>
                    <Prayer name="العصر" time={timings.Asr} image="asr-prayer-mosque.png" />
                </Grid>
                <Grid xs={2}>
                    <Prayer name="المغرب" time={timings.Maghrib} image="sunset-prayer-mosque.png" />
                </Grid>
                <Grid xs={2}>
                    <Prayer name="العشاء" time={timings.Isha} image="night-prayer-mosque.png" />
                </Grid>
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
                                <MenuItem key={city.apiName} value={city.apiName}>{city.displayNAme}</MenuItem>
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