import { AppDataSource } from "../data-source";
import User from "../models/interface/ConnectUserInterface";






// module.exports = {
//     getBddId
// };
// async function getBddId() {

// }
// hasher le mdp avant de l'envoyer dans la bdd
//salt = 10, combien de fois sera exécuté l'algo de hashage

// Ce qui va être enregistré dans la bdd


//envoyer le user dans la bdd

class ConnectService {


getAllId(): Promise<void> {
    return AppDataSource.query(`select * from user_connect`)
}

postId(user:User): Promise<void> {
  return AppDataSource.query(`insert into user_connect(email, userpassword) values('${user.email}', '${user.userpassword}')`)
}

logId(user: User): Promise<User[]>{
  return AppDataSource.query(`select * from user_connect  where user_connect.email = '${user.email}'`)
}
// logId(user:User): Promise<void> {
// return AppDataSource.query()
// }
}

export default ConnectService;