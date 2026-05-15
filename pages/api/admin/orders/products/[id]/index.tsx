import { getSession } from "next-auth/react"
import Product from "@/models/Product";
import db from "@/utils/db";



const handler = async (req:any, res:any) => {
    const session:any = await getSession({ req});
    if (!session || (session && !session.user.isAdmin)){
        return res.status(401).send('login obrigatorio');
    }

    // eslint-disable-next-line no-unused-vars
    const { user } = session;
    if(req.method === 'GET'){
        return getHandler(req, res);
    }else if (req.method === 'PUT'){
        return putHandler(req,res);
    }else if (req.method === 'DELETE') {
        return deleteHandler(req, res);
    }else{
        return res.status(400).send({message:'Metodo nao permitido'})
    }
};
const getHandler= async (req:any, res:any) =>{
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
};

const putHandler= async (req:any,res:any) => {
    await db.connect();
    const product = await Product.findById(req.query.id);
    if (product){
        product.name = req.body.name || product.name;
        product.slug = req.body.slug || product.slug;
        product.price = req.body.price || product.price;
        product.category = req.body.category || product.category;
        product.image = req.body.image || product.image;
        product.flavor = req.body.flavor || product.flavor;
        product.countInStock = req.body.countInStock || product.countInStock;
        product.description = req.body.description || product.description;
        await product.save(); 
        await db.disconnect();
        res.send({message: 'Produto atualizado com sucesso'})
    }else{
        await db.disconnect();
        res.status(404).send({message:'Produto nao encontrado'})
    }
   
};
const deleteHandler = async (req:any, res:any) => {
    await db.connect();
    const product = await Product.findById(req.query.id);
    if (product) {
        await product.deleteOne();
        await db.disconnect();
        res.send({message: 'Produto removido com sucesso'})
    }else{
        await db.disconnect();
        res.status(404).send({ message: 'Produto nao encontrado'})
    }
}
export default handler
