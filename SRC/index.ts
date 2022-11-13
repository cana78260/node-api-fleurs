import express from "express";
import cors from "cors";
import planteRoute from "./ROUTES/RoutesPlantes";
import { AppDataSource } from "./data-source";
import path = require("path");


AppDataSource.initialize().then(async () =>{
const app = express();
app.use(express.json()); // On peut récupérer des infos dans un body au format JSON
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"], //On permet des requetes
  })
);

app.use("/api/plantes", planteRoute);

app.use("/assets", express.static(path.join(__dirname, "../public/assets")));

app.listen(8080, () => {
  console.log(`L'api tourne sur l'adresse localhost:8080`);
});

})

