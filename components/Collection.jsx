import Image from "next/image";
import Link from "next/link";


export default function Collection({ products }) {

    const FormatPrice = (price) => {


        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    }
    
    if (products) {
        return <>

            <section>

                <div className="max-w-screen-2xl px-4 py-8 mx-auto sm:py-12 lg:px-8 " >
                    <header className="text-center">
                        <h2 className="text-xl font-bold  text-accent sm:text-3xl">
                            new Collection
                        </h2>
                        <p className="max-w-lg mx-auto mt-4 text-gray-500 ">
                            explore our latest arrivals and elevate your style with our exclusive collection .
                        </p>
                    </header>
                    <div >
                    <div className="max-w-screen-2xl px-4 py-8 mx-auto sm:py-12 lg:px-8">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                            <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8 ">
                                <div className="max-w-md mx-auto text-center lg:text-left">
                                    <header>
                                        <h2 className="text-xl font-bold  text-accent sm:text-3xl">
                                            {products.title}
                                        </h2>
                                        <p className="mt-4 text-gray-500">
                                            {products.description}
                                        </p>
                                        <p className="mt-1 text-lg mb-10 text-primary ">
                                            Eur. {FormatPrice(products.price)}
                                        </p>


                                    </header>
                                    <Link href={'/products'} className="rounded-lg border border-gray-300
                                    bg-white px-12 py-3
                                    text-center text-sm font-medium
                                    text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring
                                     focus:ring-gray-100 hover:border-secondary" >Shop All</Link>
                                </div>
                            </div>
                            <div className="lg-col-span-2 lg:py-8 ">
                                <ul className="grid grid-cols-2 gap-4 ">
                                <li>
                                            <div className="block group">
                                                <div className="relative w-full h-full aspect-square rounded overflow-hidden">
                                                    <Image
                                                        src={products.images[0]}
                                                        alt="product"
                                                        width={200}
                                                        height={300}
                                                        className="group-hover:opacity-75 object-fill transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    
                                        <li>
                                            <div className="block group">
                                                <div className="relative w-full h-full aspect-square rounded overflow-hidden">
                                                    <Image
                                                        src={products.images[1]}
                                                        alt="product"
                                                        height={200}
                                                        width={200}
                                                        className="group-hover:opacity-75 object-cover  transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                </ul>
                            </div>
                        </div>
                    </div> 
                    </div>
                </div>
            </section>

        </>

    }
}
