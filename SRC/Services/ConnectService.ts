import { AppDataSource } from "../data-source";
import bcrypt from 'bcrypt';
import { Db } from "typeorm";


// module.exports = {
//     getBddId
// };
// async function getBddId() {

// }

// const user = new Db.User(params) 


class ConnectService {


getAllId(): Promise<void> {
    return AppDataSource.query(`select * from user_connect`)
}

}

export default ConnectService;