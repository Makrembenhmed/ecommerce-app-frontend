import Collection from "@/components/Collection";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import ProdCollection from "@/components/prodCollection";

import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";



export default function Home({ featuredProduct, newProducts, collectionProduct, allProducts }) {
  return <>
  
    <ProdCollection products={allProducts} />
    <hr className="my-3 h-px border-0 bg-gray-300" />
    <Hero product={featuredProduct} />
    <hr className="my-3 h-px border-0 bg-gray-300" />
    <Products products={newProducts} />
    <hr className="my-3 h-px border-0 bg-gray-300" />
    <Collection products={collectionProduct} />


  </>
}

export async function getServerSideProps() {

  await mongooseConnect()

  const featuredId = '666b208ffc1389aba6ffcbda'
  const collectionId = '666b215dfc1389aba6ffcbe2'

  const featuredProduct = await Product.findById(featuredId)
  const collectionProduct = await Product.findById(collectionId)
  const newProducts = await Product.find({}, null, { sort: { '_id': 1 }, limit: 5 })
  const allProducts = await Product.find({}, null, { sort: { _id: 1 } })
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      collectionProduct: JSON.parse(JSON.stringify(collectionProduct)),
      allProducts: JSON.parse(JSON.stringify(allProducts)),
    }
  }
}