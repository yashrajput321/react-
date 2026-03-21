import React from "react";
import { motion } from "framer-motion";

 const Content=() => {
    return(
        <div 
        className="content bg-neutral-900  h-screen w-full flex items-center justify-center"
        style={{
        backgroundImage: `radial-gradient(circle, rgba(6,182,212,0.4) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        backgroundRepeat: 'repeat',
}}
>
            <motion.button
            initial={{rotate:20}}
            animate={{rotate:0}}
            transition={{duration:1}}
             className=" bg-neutral-900 group relative text-neutral-500 px-8 py-12 rounded-lg bg-black-100 shadow-2xl">Cheemu The Great
                <span className="absolute inset-x-0 bottom-px bg-linear-to-r from transparent via-cyan-500
                to transparent h-px w-3/4 mx-auto"></span>
                <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity:300 inset-x-0 bottom-px bg-linear-to-r from transparent via-cyan-500 h-3px
                to transparent h-px w-3/4 mx-auto"></span>
            </motion.button>
            
        </div>
    )
}

export default Content