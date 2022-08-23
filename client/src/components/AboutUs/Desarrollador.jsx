import React from 'react'
import { FaGithub,FaLinkedin } from "react-icons/fa";

const Desarrollador = ({img,name,nacionalidad,git,linkedin}) => {
  return (
    <div className="">
        <div className="rounded-full overflow-hidden shadow-md border border-gray-800">
            <img src={img} alt=""/>
        </div>
        <div className="flex justify-center items-center flex-col">
            <div><p>{name}</p></div>
            <div><p>{nacionalidad}</p></div>
            <div className="flex">
                <a href={git} target="_blank"><FaGithub /></a>
                <a href={linkedin} target="_blank"><FaLinkedin /></a>
            </div>
        </div>
    </div>
  )
}

export default Desarrollador