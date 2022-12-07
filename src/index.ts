import express, {Router} from "express";
import "dotenv/config";


interface Livro {
    id?: number;
    title:string;
    autorName:string;
}


const port = process.env.PORT;
const app = express();
const router = Router();

app.use(express.json());

router.get('/',(req,res)=>{
    return res.json(database);
})

const database: Livro[] = [];

database.push({
    id:database.length,
    title:'A trança dos carecas',
    autorName:"Careca"
})

// Rota para Criar um livro
router.post('/',(req,res)=>{
    const livro = req.body as Livro;

    livro.id = database.length;

    database.push(livro);
    console.log(livro);

    const livroCreated = database[database.length -1]

    return res.json(livroCreated);


})


router.put("/:id",(req,res)=>{

    const id = parseInt(req.params["id"]);

    const livroRequest = req.body as Livro;

    const livro = database.find(livro => livro.id === id);
    
    if (!livro){
        return res.json({message: "Livro não encontrado!"})
    }
    // Altera os valores do livro pelo da requisição;
    livro.title = livroRequest.title ?? livro?.title ;
    livro.autorName = livroRequest.autorName ?? livro.autorName;

    database[id] = livro;

    return res.json(database[id]);


})


router.delete("/:id", (req,res,next)=>{

    const id = parseInt(req.params["id"]);
    const livro = database.find(livros => livros.id === id);

    if (!livro){
        return res.json({message:"Livro não encontrado"});
    }

    next();

}, (req,res)=>{
    const id = parseInt(req.params["id"]);

    const deleted = database.splice(id,1);

    return res.json(deleted[0]);

})
app.use(router);

app.listen(port,()=>{
    console.log(`Servidor Iniciado na porta ${port}`)

})