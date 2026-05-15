import Order from '@/models/Order';

import db from "@/utils/db";
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
    const sessao = await getSession({ req });
    if (!sessao) {
        return res.status(401).send('Erro: login obrigatorio')
    }

    await db.connect()
    const pedido = await Order.findById(req.query.id)
    if(pedido) {
        if (pedido.isPaid) {
            return res.status(400).send({ message: "Erro: pedido ja foi pago" })
        }
        pedido.isPaid = true;
        pedido.paidAt = Date.now();
        pedido.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            email_address: req.body.email_address
        };
        const pedidoPago = await  pedido.save();
        await db.disconnect();
        res.send({message: 'Pedido pago com sucesso', order: pedidoPago});
    }else{
        await db.disconnect();
        res.status(404).send({message:'Erro: pedido nao encontrado'})
    }
}

export default handler
