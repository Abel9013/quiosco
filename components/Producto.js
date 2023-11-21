import Image from "next/image"

const Producto = ({producto}) => { 
  console.log(producto);
  const {nombre, imagen, precio} = producto
  return (
    <div className="border p-3">
      <Image src={`/assets/img/${imagen}.jpg`}
      // <Image src={`/assets/img/${imagen}.jpg`}
             alt={`Imagen platillo ${nombre}`} 
             width={400}
             height={500}
      /> 
    </div>
  )
}

export default Producto