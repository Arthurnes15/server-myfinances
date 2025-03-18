import app from './app';

const port = process.env.PORT;

app.on('ready', () => {
  app.listen(port, () => {
    console.log('Acessar: http://localhost:3001');
    console.log('Servidor executando na porta 3001');
  });
});
