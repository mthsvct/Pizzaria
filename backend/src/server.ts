import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'; // Tratativa de erros
import cors from 'cors';
import path from 'path';

import router from './routes';


const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use( // Criando uma rota estástica para acessar os arquivos
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => { // quando tiver um erro, ele vai cair aqui
    if(err instanceof Error){
        // Se for uma instancia do tipo error
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"

    });
});

app.listen(3333, () => console.log('Servidor online!'));