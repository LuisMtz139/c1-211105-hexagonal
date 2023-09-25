import express = require('express');
import { Signale } from 'signale';
import { bookRouter } from './src/book/infraestructure/routers/loanRouter';


const app = express();
const signale = new Signale();

app.use(express.json());

app.use('/book', bookRouter);

app.listen(3000, () => {
    signale.success("Servidor corriendo en el puerto 3000");
});
