import express, {Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser'
import 'express-async-errors'
import cors from 'cors'
import { router } from './routes'

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl === '/webhooks') {
        next(); // Não aplica JSON parsing aqui
    } else {
        bodyParser.json()(req, res, next);
    }
});
  
app.use(cors());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error){
        res.status(400).json({
            error: err.message
        })
        return;
    }

    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
    return;

})

app.listen(process.env.PORT, () => console.log(`Servidor online na porta ${process.env.PORT}`));