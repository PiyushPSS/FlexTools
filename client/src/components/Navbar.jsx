import React from 'react'

const Navbar = () => {
    return (
        <div className='navbar px-28 mt-10 font-sans'>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold font-sans text-3xl cursor-pointer'>FlexTools.me</h1>
                <div className="relative">
                    {/* Shadow Div */}
                    <div className="absolute inset-0 bg-black opacity-30 translate-y-1 rounded-full z-0"></div>

                    {/* Navbar Div */}
                    <div className="relative bg-white text-black px-12 py-3 rounded-full z-10">
                        <a href="#" className="text-black mr-4 hover:font-semibold">
                            Home
                        </a>
                        <a href="#" className="text-black mr-4 hover:font-semibold">
                            Features
                        </a>
                        <a href="#" className="text-black mr-4 hover:font-semibold">
                            Pricing
                        </a>
                        <a href="#" className="text-black hover:font-semibold">
                            Contact
                        </a>
                    </div>
                </div>


                <button className='px-12 py-[10px] rounded-full shadow-md bg-white text-black border border-white hover:border-black cursor-pointer hover:font-semibold'>Log in</button>
            </div>
        </div>
    )
}

export default Navbar