import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    const { id, action } = req.query;

    if (action === "completar") {
      // Lógica para completar la orden
      try {
        await prisma.orden.update({
          where: {
            id: parseInt(id),
          },
          data: {
            // Otras actualizaciones necesarias para completar la orden
            estado: true
          },
        });
        res.status(200).json({ message: "Orden completada" });
      } catch (error) {
        res.status(500).json({ error: "Hubo un error al completar la orden" });
      }
    } else if (action === "procesar") {
      // Lógica para cambiar el estado a procesando
      try {
        await prisma.orden.update({
          where: {
            id: parseInt(id),
          },
          data: {
            procesando: true,
          },
        });
        res.status(200).json({ message: "Orden marcada como procesando" });
      } catch (error) {
        res.status(500).json({ error: "Hubo un error al cambiar el estado" });
      }
    } else {
      res.status(400).json({ error: "Acción no válida" });
    }
  }
}


// import {PrismaClient} from "@prisma/client"

// export default async function handler(req, res){
  
//   const prisma = new PrismaClient()
  
//   if(req.method === "POST"){
//     const{ id } = req.query   
//     const ordenActualizada = await prisma.orden.update({
//       where:{
//         id: parseInt(id)
//       },
//       data:{
//         estado: true
//       }
//     })
//     res.status(200).json(ordenActualizada)

//   }
// }