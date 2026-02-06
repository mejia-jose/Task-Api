/** Permite que la api funcione y se ejecute correctamente en entorno local. **/

import app from "./app";

const port = 3000;

app.listen(port, () => 
{
  console.log('Servidor local corriendo en el puerto: '+port);
});

