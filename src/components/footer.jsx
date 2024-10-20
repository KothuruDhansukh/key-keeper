import React from 'react'

const footer = () => {
  return (
    <div className=" flex bg-slate-800 w-full text-white h-11 justify-between items-center gap-2  bottom-0 ">
        <ul className='flex gap-10 mx-3'>
            <li className=" cursor-pointer hover:font-bold">Privacy and Cookies</li>
            <li className=" cursor-pointer hover:font-bold">Legal</li>
            <li className=" cursor-pointer hover:font-bold">Advertise</li>
            <li className=" cursor-pointer hover:font-bold">Help</li>
            <li className=" cursor-pointer  hover:font-bold">Feedback</li>

        </ul>
        <div className="logo font-bold text-white p-2">
          <span className="text-lime-400">&lt; Key</span>
          Keeper
          <span className="text-lime-400">/ &gt;</span>
        </div>
    </div>
  )
}

export default footer
