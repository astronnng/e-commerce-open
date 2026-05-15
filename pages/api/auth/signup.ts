import db from "@/utils/db";
import User from "@/models/User";
let bcrypt = require('bcryptjs');
 
const handler = async(req:any,res:any) => {
 if(req.method !== 'POST') {
    return;
 }
 const {name, email, password}:any = req.body;
 if (
    !name ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 6
 ){
    res.status(422).json({
        message: 'Erro de validacao'
    });
    return;
 }

 await db.connect();
 const usuarioExistente = await User.findOne({email: email})
 if (usuarioExistente) {
    res.status(422).json({message: 'Usuario ja existe'});
    await db.disconnect();
    return;
 }
 const novoUsuario = new User({
    name,
    email,
    password: bcrypt.hashSync(password),
    isAdmin: false
 })
 const usuario = await novoUsuario.save();
 await db.disconnect();
 res.status(201).send({
   message: "Usuario criado",
   _id: usuario._id,
   name: usuario.username,
   email: usuario.email,
   isAdmin: usuario.isAdmin,

 });

}

export default handler;
