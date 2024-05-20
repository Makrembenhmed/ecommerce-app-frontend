import Collection from "@/components/Collection";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";



export default function Home({featuredProduct,newProducts,collectionProduct}) {
  return <>
    <Hero product={featuredProduct} />
    <hr className="my-3 h-px border-0 bg-gray-300" />
    <Products products={newProducts}/>
    <hr className="my-3 h-px border-0 bg-gray-300" />
    <Collection products= {collectionProduct}/>

    
    </>
}

export async function getServerSideProps(){

  await mongooseConnect()

  const featuredId = '6636b897930b730f305e7dc7'
  const collectionId='662adcb1715bf117c6b02bb3'

const featuredProduct = await Product.findById(featuredId)
const collectionProduct = await Product.findById(collectionId)
const newProducts = await Product.find({},null,{sort:{'_id':1},limit:5})
return {
  props:{
    featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
    newProducts: JSON.parse(JSON.stringify(newProducts)),
    collectionProduct: JSON.parse(JSON.stringify(collectionProduct)),
  }
}
}