import express from "express";
import cors from "cors";
import absenceRoute from "./routes/absencesRoutes";
import morgan from 'morgan';


const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(morgan('combined'))

app.use("/api/v1/absences", absenceRoute);


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));