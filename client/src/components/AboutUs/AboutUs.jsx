import React from "react";
import { useNavigate } from "react-router-dom";
import Desarrollador from "./Desarrollador"

export default function AboutUs() {

    return(
        <div className="text-4xl p-14">
            <div>
                <h1>¿Qué es Musiccomerce?</h1>
                <p className="mt-5">Somos un ecommerce especializado en la compra, venta y 
                    distribución de instrumentos musicales. Nuestro objetivo es 
                    conectar a compradores y vendedores para realizar transacciones 
                    y satisfacer la necesidades del mercado en cuestión</p>
            </div>
            <div className="mt-14">
                <h1>Equipo desarrollador</h1>
                <div className="grid grid-cols-4 gap-10 mt-5">
                    <Desarrollador img="https://avatars.githubusercontent.com/u/64044792?v=4" name="Oscar Restrepo" nacionalidad="Colombia" git="" linkedin="https://www.linkedin.com"/>
                    <Desarrollador img="https://avatars.githubusercontent.com/u/80359162?v=4" name="Neider Urbano" nacionalidad="Colombia" git="https://github.com/Neider-Urbano" linkedin="https://www.linkedin.com/in/neider-julian-urbano-bastilla-30860b23b/"/>
                    <Desarrollador img="https://avatars.githubusercontent.com/u/92812509?v=4" name="Armando" nacionalidad="Colombia" git="" linkedin=""/>
                    <Desarrollador img="https://avatars.githubusercontent.com/u/5093035?v=4" name="Nilson" nacionalidad="Colombia" git="" linkedin=""/>
                    <Desarrollador img="https://avatars.githubusercontent.com/u/10248108?v=4" name="Juan B'errimo" nacionalidad="Colombia" git="" linkedin="https://www.linkedin.com/in/armucode"/>
                    <Desarrollador img="https://media-exp1.licdn.com/dms/image/C5603AQEAGFwSRNtplw/profile-displayphoto-shrink_800_800/0/1645922381166?e=1666828800&v=beta&t=nFeOHEHZH1DxOcVFcmYBnPDeGr-9XxIk8XyDeE_wCT8" name="Angie Moreno" nacionalidad="Colombia" git="" linkedin="https://www.linkedin.com/in/angie-va-moreno-5796b722b"/>
                    <Desarrollador img="https://icon-library.com/images/2018/3965934_usuario-aws-certification-transparent-png.png" name="Ezequiel Soto" nacionalidad="Argentina" git="" linkedin=""/>
                </div>
            </div>
        </div>
    )
    
}