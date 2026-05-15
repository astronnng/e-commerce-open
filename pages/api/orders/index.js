import Order from "@/models/Order";
import db from "@/utils/db";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
    const tokenSessao = await getToken({ req });
    if (!tokenSessao) {
        return res.status(404).send('login obrigatorio')
    }
    

    const usuarioSessao = tokenSessao;
    if (!usuarioSessao || !usuarioSessao._id) {

        return res.status(404).send('login obrigatorio')

    }
    await db.connect();
    const novoPedido = new Order({
        ...req.body,
        user: usuarioSessao._id,
    });
    const pedido = await novoPedido.save();
    res.status(201).send(pedido);
}

export default  handler;
