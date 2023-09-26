import express = require('express');
import { Signale } from 'signale';
import { loanRouter } from './src/loans/infraestructure/routers/loanRouter';


const app = express();
const signale = new Signale();

app.use(express.json());

app.use('/loans', loanRouter);

app.listen(3000, () => {
    signale.success("Servidor corriendo en el puerto 3000");
});
