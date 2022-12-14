import { Router } from "express";
import ConnectControll from "../CONTROLLER/ControllConnect";
//import { authentificateToken}

const connectRoute = Router();
const connectControll = new ConnectControll;

connectRoute.get("/", (req, res) => {
connectControll.getId(req, res);
});

connectRoute.post("/", (req, res) => {
connectControll.postId(req, res);
});

connectRoute.post("/login",/*authentificateToken,*/ (req, res) => {
    connectControll.logId(req, res);
});


connectRoute.put("/", (req, res) => {
    connectControll.putId(req, res);
});

connectRoute.delete("/", (req, res) => {
    connectControll.delId(req, res);
});


export default connectRoute;