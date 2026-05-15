import { getSession } from 'next-auth/react';
import Order from '@/models/Order';
import db from '@/utils/db';

const handler = async (req: any, res: any) => {
  const session: any = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('login obrigatorio');
  }
  if (req.method === 'GET') {
    await db.connect();
    const orders = await Order.find({}).populate('user', 'name');
    await db.disconnect();

    res.send(orders);
  } else {
    return res.status(400).send({ message: 'Metodo nao permitido' });
  }
};

export default handler;
