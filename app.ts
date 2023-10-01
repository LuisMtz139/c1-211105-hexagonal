import express = require('express');
import { Signale } from 'signale';

import { userRouter } from './src/User/infraestructure/routers/userRouter';
import { reviewRoutes } from './src/views/infraestrucuture/routers/reviewRoutes';
import { loanRouter } from './src/loans/infraestructure/routers/loanRouter';



const app = express();
const signale = new Signale();

app.use(express.json());



app.use('/users', userRouter);
app.use('/review', reviewRoutes);
app.use('/loans', loanRouter);


app.listen(3000, () => {
    signale.success("Servidor corriendo en el puerto 3000");
});
