import { Request, Response} from "express";
import ConnectService from "../Services/ConnectService";

class ConnectControll {

    private connectUserService = new ConnectService;

async getId(req: Request, res: Response) {
    const getid = await this.connectUserService.getAllId();
     await res.send({status: "ok ça roule", message: "go ahead", data:getid })
}

async postId(req: Request, res: Response) {
     await res.send({status: "ok ça roule", message: "ça post"})
}

async putId(req: Request, res: Response) {
     await res.send({status: "ok ça roule", message: " ça put"})
}

async delId(req: Request, res: Response) {
     await res.send({status: "ok ça roule", message: "ça del"})

}
}
export default ConnectControll;