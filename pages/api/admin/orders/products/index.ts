import { getSession } from "next-auth/react";
import Product from "@/models/Product";
import db from "@/utils/db";

const DEFAULT_PRODUCT_IMAGE = '/images/shirts1.jpg';

const handler = async (req:any, res:any) => {
    const session:any = await getSession({req});
    if (!session || !session.user.isAdmin){
        return res.status(401).send('login de administrador obrigatorio');

    }
   // const { user } = session;
    if (req.method === 'GET'){
        return getHandler(req, res);
    }else if(req.method === 'POST') {
        return postHandler(req, res);
    }
    else {
        return res.status(400).send({message: 'Metodo nao permitido'})
    }
};
const postHandler = async (req:any, res:any) => {
    await db.connect();
    const newProduct = new Product({
        name:'Novo produto',
        slug: 'novo-produto-' + Math.round(Math.random() * 1000000),
        image: DEFAULT_PRODUCT_IMAGE,
        price: 0,
        category: 'shirts',
        flavor: 'nao informado',
        countInStock: 0,
        description: 'Atualize os dados deste produto antes de publicar.',
        rating: 0,
        numReviews: 0,
    });
    const product = await newProduct.save();
    await db.disconnect()
    res.send({message: 'Produto criado com sucesso', product})
}
const getHandler = async (req:any, res:any) => {
    await db.connect();
    const products = await Product.find({});
    await db.disconnect();
    res.send(products);
}

export default handler;

