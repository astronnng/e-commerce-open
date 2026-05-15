import User from "@/models/User";
import db from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
let bcrypt = require('bcryptjs');

interface RequisicaoComBody extends NextApiRequest {
  body: {
    name: string;
    email: string;
    password?: string;
    image?: string;
  };
}

async function handler(
  req: RequisicaoComBody,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(400).send({ message: `Metodo ${req.method} nao suportado` });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "login obrigatorio" });
  }
  const { user: usuarioSessao }:any = session;
  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !email.includes("@") ||
    (password && password.trim().length < 3)
  ) {
    res.status(422).json({
      message: "Erro de validacao",
    });
    return;
  }

  await db.connect();
  const usuarioParaAtualizar = await User.findById(usuarioSessao._id);
  usuarioParaAtualizar.name = name;
  usuarioParaAtualizar.email = email;
  if (password) {
    usuarioParaAtualizar.password = await bcrypt.hash(password, 10);
  }
  await usuarioParaAtualizar.save();
  await db.disconnect();
  res.send({
    message: 'Usuario atualizado com sucesso'
  })
}

export default handler;
