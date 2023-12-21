import { PrismaClient } from "@prisma/client" 

export default async function handler(req, res) {
  const prisma = new PrismaClient()  
      const ordenes = await prisma.orden.findMany({
        where: {
          procesando: true
        }
      })
      res.status(200).json(ordenes);
    
}