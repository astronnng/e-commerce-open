import Order from "@/models/Order";
import db from "@/utils/db";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
    const token = await getToken({ req });
    if (!token) {
        return res.status(404).send('login obrigatorio')
    }
    

    const   user  = token;
    if (!user || !user._id) {

        return res.status(404).send('login obrigatorio')

    }
    await db.connect();
    const newOrder = new Order({
        ...req.body,
        user: user._id,
    });
    const order = await newOrder.save();
    res.status(201).send(order);
}

export default  handler;
