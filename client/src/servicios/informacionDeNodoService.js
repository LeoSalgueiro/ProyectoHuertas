import axios from 'axios';

//Trae todos los usuarios
export default {

    getAllNodos: async(parametros) => {//aca le paso el mail para que traiga todos los nodos de un usuario 
        let res = await axios.get(`/api/nodos`,{params: {
          email: parametros.email
        }});
        return res.data || []
    },
    
    getNodo: async(parametros)=>{

        let res = await axios.get(`/api/nodo/`,{params: {
            email: parametros.email,
            nombre: parametros.nombre
          }});
        return res.data || [];
    },

    registrarNodo: async (parametros) =>{
      let finale = new Array();
      let conexiones = parametros.conexiones.forEach(element => {
        let resul = {"nombre":element,"valor":"50"}//por ahora los valores se agregan con 50, esto no deberia ir ya que estos datos no se cargan, sino que se buscan de la bd
  
        finale.push(resul);
      });


        
        let res = axios.post('/api/nodo', {
         nombre: parametros.nombre,
         tipo: parametros.tipo,
         conexiones: finale,
         email: parametros.email,
         descripcion: parametros.descripcion,
         fechaAlta: parametros.fechaAlta
   
       })
       .then(function (response) {
         console.log(response);
       })
       .catch(function (error) {
         console.log(error);
       });
     
   
     },

}