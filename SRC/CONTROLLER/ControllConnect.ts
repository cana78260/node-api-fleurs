import { Request, Response } from "express";
import ConnectService from "../Services/ConnectService";
import bcrypt from "bcrypt";
import User from "../models/interface/ConnectUserInterface";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

/*  function generateAccessToken(user){

jwt.sign({email: `${req.body.email}` , password : `${passwordUser}`, {expires in: '1800s'}});

}



app.post( (req,res) => {
     
     if(req.body.email !== user.email) {
          res.status(401).send("invalid credential")
          return;
     }
     if(req.body.password !== user.password) {
          res.status(401).send("invalid password")
          return;
     }
     const accessToken = generateAccessToken(user);
     res.send({accessToken,})
})



export function  authentificateToken(req, res, next){
const authHeader = req.headers['authorization']
const token = authHeader && authHeader.split(' ')[1];

if (!token){
     return res.sendStatus(401);
}

jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
     if(err){
          return res.sendStatus(401);
     }
     req.user = user;
     next()
})

}

*/

// hasher le mdp avant de l'envoyer dans la bdd
// bcrypt.hash(req.body.password, 10) //salt = 10, combien de fois sera exécuté l'algo de hashage
// .then((hash) => {
// // Ce qui va être enregistré dans la bdd
// const user = new User {

// email: req.body.email,
// password: hash
// }}

//envoyer le user dans la bdd

class ConnectControll {
  private connectUserService = new ConnectService();

  async getId(req: Request, res: Response) {
    const getid = await this.connectUserService.getAllId();
    res.send({ status: "ok ça roule", message: "go ahead", data: getid });
  }

  async postId(req: Request, res: Response) {
    const postOneUser = { ...req.body };
    if (!postOneUser.email || postOneUser.password === undefined) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'email', 'password'",
        },
      });
      return;
    }
    // hasher le mdp avant de l'envoyer dans la bdd
    bcrypt
      .hash(req.body.password, 10) //salt = 10, combien de fois sera exécuté l'algo de hashage
      .then(async (hash) => {
        // // Ce qui va être enregistré dans la bdd
        const user: User = {
          email: req.body.email,
          userpassword: hash,
        };
        //on place le try dans le .then pour gérer l'asynchrone
        try {
          await this.connectUserService.postId(user);
          res.send({ status: "ok", message: "user created" });
        } catch (error: any) {
          res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error },
          });
        }
      });
  }

  async logId(req: Request, res: Response) {
    if (req.body.email === undefined || req.body.password === undefined) {
      res.status(400).send({
        status: false,
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'email', 'password'",
        },
      });
      return;
    }
    try {
      const user: User[] = await this.connectUserService.logId(req.body);
      console.log("user récupéré : ", user);
      const passwordUser = user[0].userpassword;
      console.log("password : ", passwordUser);

      bcrypt
        .compare(req.body.password, passwordUser)
        .then((result) => {
          // res.send(result);
          console.log(result);
          if (result) {
            let token = jwt.sign({ user: user[0] }, "sddfdsqfvsdvsdverre");
            console.log(token);
            res.status(200).send({ token, status: true });
            console.log(result);
          } else {
            res.send("password error");
          }
        });
    } catch (err: any) {
      res.send({ message: "pas bon" });
    }
  }

  //     if (!passwordsMatch){res.status(400).send({
  //     status: false,
  //     data: {
  //       error:
  //         "wrong password, try again",
  //     },
  //   });
  //   return;

  // }
  //   try {res.status(201).send({status: true, message:"ok"});}catch(err:any){
  //     res.send({message:"ça marche"})
  //   }

  async putId(req: Request, res: Response) {
    await res.send({ status: "ok ça roule", message: " ça put" });
  }

  async delId(req: Request, res: Response) {
    await res.send({ status: "ok ça roule", message: "ça del" });
  }
}

export default ConnectControll;
