import React from "react"


export default function PageHeader({header, children}){
    return <div className="top-0 left-0 md:z-[10] md:sticky flex justify-between items-center backdrop-blur-md mb-6 p-4 border-b border-t w-full">
        <h1 className="font-bold text-3xl text-gray-800">{header}</h1> 
        {children}        
    </div>
}