import Success from "@/components/Success";
import { CartContext } from "@/lib/CartContext";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";



export default function Cart() {

  const { cartProducts, removeProduct, addProduct, clearCart } = useContext(CartContext)
  const { data: session } = useSession();
  const [products, setProducts] = useState([])
  const [adress, setAdress] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [zip, setZip] = useState('')
  const [issuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts }).then(response => { setProducts(response.data) })
    } else {
      setProducts([])
    }
  }, [cartProducts])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return


    } else {
      if (window?.location.href.includes('success')) {
        setIsSuccess(true)
        clearCart()
          toast.success('Order Succesfully placed ')
        

      }
    }

  }, [])

  function increaseProduct(id) {
    addProduct(id);
  }



  const formatPrice = (price) => {


    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  }

  function decreaseProduct(id) {
    removeProduct(id);
    toast.success('Removed product!!')
  }
  function deleteCart(id) {
    clearCart();
    toast.success('Cart cleared!!')
  }
  let total = 0
  for (const productID of cartProducts) {
    const price = parseFloat(products.find(p => p._id === productID)?.price || 0)
    total += price;
  }
  async function stripeChekout() {

    const response = await axios.post('/api/checkout', {
      email: session.user.email,
      name: session.user.name, adress, state, zip, country, cartProducts
    }


    )
    if (response.data.url) {
      window.location = response.data.url

    } else {
      toast.error('an error occured ')
    }
    }
    if(issuccess){
      return <>
      <Success/>
      </>
    }


  if (session) {
    return <>
      <section className="flex justify-between max-md:flex-col md:space-x-4">

        <div className="md:w-2/3 px-4 ">
          <div className="mt-16 md:mt-6 ">
            <header className="text-center flex justify-between w-full ">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Your Cart
              </h1>
            </header>
            {!products?.length ? (
              <p className="my-6 text-center "> Your Cart Is Empty

              </p>) :
              (<>
                {products?.length > 0 && products.map(product => (
                  <div className="mt-8" key={product._id}>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-4 justify-between">
                        <img src={product.images[0]} alt="img prod" className="h-16 w-16 object-cover " />
                        <div>
                          <h3 className="text-md text-text  max-w-md ">
                            {product.title}
                          </h3>
                          <dl className="mt-1 space-y-px  text-md  text-text ">
                            <p> EUR {formatPrice(cartProducts.filter(id => id === product._id).length * product.price)} </p>
                          </dl>
                        </div>
                        <div>
                          <label htmlFor="Quantity" className="sr-only"> Quantity </label>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border "
                              onClick={() => decreaseProduct(product._id)}
                            >
                              -
                            </button>

                            <input
                              type="numbe p-3 borderr"
                              id="Quantity"
                              value={cartProducts.filter(id => id === product._id).length}
                              className="h-10 w-16 rounded border border-secondary text-primary font-bold text-center [-moz-appearance:_textfield] sm:text-md [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"


                            />

                            <button
                              type="button"
                              className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border"
                              onClick={() => increaseProduct(product._id)}
                            >
                              +
                            </button>
                          </div>
                        </div>

                      </li>
                    </ul>
                  </div>
                ))}
                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className=" max-w-md space-y-4">
                    <dl className="space-y-0.5 text-md text-gray-700">
                      <div className="flex justify-end text-red-400 border-b mb-3">
                        <button onClick={deleteCart}>Clear Cart</button>

                      </div>
                      <div className="flex justify-between">
                        <dt>Total : </dt>
                        <dd>EUR. {formatPrice(total)} </dd>
                      </div>
                    </dl>
                    <div className="flex justify-end">

                      <Link
                        className="group flex items-center justify-between gap-4 rounded-lg border border-primary bg-primary px-5 py-3 transition-colors hover:bg-transparent focus:outline-none focus:ring"
                        href="/products"
                      >
                        <span
                          className="font-medium text-white transition-colors group-hover:text-primary group-active:text-indigo-500"
                        >
                          Continue Shopping
                        </span>

                        <span
                          className="shrink-0 rounded-full border border-current bg-white p-2 text-primary group-active:text-indigo-500"
                        >
                          <svg
                            className="size-5 rtl:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>
                      </Link>

                    </div>
                  </div>
                </div>


              </>)
            }

          </div>
        </div>
        {!products?.length ? (
          '') :
          (<div className="md:1/3 mt-16 md:mt-6  ">
            <header className="text-center flex flex-col w-full ">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Shipping Detaills
              </h1>
              <p className="mt-2"> we use your Account Details for shipping.</p>
            </header>

            <div class="mx-auto max-w-xl p-4 border shadow-xl h-[400px] my-3">
              <div class="space-y-5">
                <div class="grid grid-cols-12 gap-5">
                  <div class="col-span-6">
                    <label for="example7" class="mb-1 block text-md font-medium text-gray-700">Email</label>
                    <input type="email" id="example7" class="block p-3 border w-full rounded-md  border-gray-300 
                  shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 
                  disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="you@email.com" value={session.user.email} />
                  </div>
                  <div class="col-span-6">
                    <label for="example8" class="mb-1 block text-md font-medium text-gray-700">Full Name</label>
                    <input type="text" id="example8" class="block p-3 border w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="you@email.com" value={session.user.name} />
                  </div>
                  <div class="col-span-12">
                    <label for="example9" class="mb-1 block text-md font-medium text-gray-700">Address</label>
                    <input type="text" id="example9" class="block  p-3 border w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="1864 Main Street" value={adress} onChange={e => setAdress(e.target.value)} />
                  </div>
                  <div class="col-span-6">
                    <label for="example10" class="mb-1 block text-md font-medium text-gray-700">City</label>
                    <input type="text" id="example10" class="block p-3 border w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="" value={country} onChange={e => setCountry(e.target.value)} />
                  </div>
                  <div class="col-span-4">
                    <label for="example11" class="mb-1 block text-md font-medium text-gray-700">State</label>
                    <input type="text" id="example10" class="block p-3 border w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="" value={state} onChange={e => setState(e.target.value)} />
                  </div>
                  <div class="col-span-2">
                    <label for="example12" class="mb-1 block text-md font-medium text-gray-700">Zip</label>
                    <input type="text" id="example12" class="block p-3 border w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="" value={zip} onChange={e => setZip(e.target.value)} />
                  </div>

                  <div class="col-span-12 text-center w-full">
                    <button onClick={stripeChekout} type="button" class=" block rounded bg-secondary px-5 py-3 text-md text-text transition
                     hover:bg-purple-300 w-full ">CheckOut</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
          )}


      </section>
    </>
  }
  return <>
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <p className="mt-4 text-text text-xl ">
          you should SignUp to View Cart Items
        </p>
        <button
          onClick={() => signIn('google')}
          className="inline-block rounded border border-primary bg-primary mt-6
           px-12 py-3 text-md font-medium text-white hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-indigo-500"
          href="#"
        >
          Continue With Google
        </button>
      </div>
    </div>
  </>
}
