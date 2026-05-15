import mongoose from "mongoose";

const conexao = {}

async function connect() {
    if(conexao.isConnected) {
        console.log('conexao ja estabelecida')
        return;
    }
    if (mongoose.connections.length > 0) {
        conexao.isConnected = mongoose.connections[0].readyState;
        if(conexao.isConnected === 1){
            console.log('usando conexao existente')
            return;
        }
        await mongoose.disconnect();
    }
   const conexaoBanco = await mongoose.connect(process.env.MONGODB_URI)
   console.log('nova conexao criada')
   conexao.isConnected = conexaoBanco.connections[0].readyState;

}
async function disconnect() {
    if (!conexao.isConnected) {
        return;
    }

    if(process.env.NODE_ENV === 'production') {
        await mongoose.disconnect();
        conexao.isConnected = false;
    } else {
        console.log('conexao mantida em desenvolvimento')
  }
}
// Converte um documento do Mongo em um objeto serializavel.
function convertDocToObj(documento) {
    documento._id = documento._id.toString();
    documento.createdAt = documento.createdAt.toString();
    documento.updatedAt = documento.updatedAt.toString();
    return documento;
}

const db =  { connect,  disconnect, convertDocToObj };
export default db;
