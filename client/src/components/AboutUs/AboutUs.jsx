import React from "react";
import { useNavigate } from "react-router-dom";
import NavBarLogin from "../NavBarLogin/NavbarLogin";
import NavBarNoLogin from "../NavbarNoLogin/NavbarNoLogin";
import Desarrollador from "./Desarrollador"
import ProfileCard from "../ProfileCard/ProfileCard";
import { AboutUsContainer, AboutUsList, MainProfileCard, ProfileCardContainer } from "./styles";
import NavBarLogin from "../NavBarLogin/NavbarLogin"
import NavBarNoLogin  from "../NavbarNoLogin/NavbarNoLogin"

export default function AboutUs() {
    const navigate = useNavigate()
    const developers = [
        {
            img:"https://avatars.githubusercontent.com/u/10248108?v=4",
            name:"Juan M. Parra",
            nacionalidad:"Colombia",
            git:"",
            linkedin:"",
            ocupation:"Full Stack Developer"
        },
        {
            img:"https://avatars.githubusercontent.com/u/64044792?v=4",
            name:"Oscar Restrepo",
            nacionalidad:"Colombia",
            git:"",
            linkedin:"",
            ocupation:"Full Stack Developer"
        },
        {
            img:"https://avatars.githubusercontent.com/u/5093035?v=4",
            name:"Nilson",
            nacionalidad:"Colombia",
            git:"",
            linkedin:"",
            ocupation:"Full Stack Developer"
        },
        {
            img:"https://avatars.githubusercontent.com/u/92812509?v=4",
            name:"Armando",
            nacionalidad:"Colombia",
            git:"",
            linkedin:"https://www.linkedin.com/in/armucode",
            ocupation:"Full Stack Developer"
        },
        {
            img:"https://media-exp1.licdn.com/dms/image/C5603AQEAGFwSRNtplw/profile-displayphoto-shrink_800_800/0/1645922381166?e=1666828800&v=beta&t=nFeOHEHZH1DxOcVFcmYBnPDeGr-9XxIk8XyDeE_wCT8",
            name:"Angie Moreno",
            nacionalidad:"Colombia",
            git:"",
            linkedin:"https://www.linkedin.com/in/angie-va-moreno-5796b722b",
            ocupation:"Full Stack Developer"
        },
        {
            img:"https://icon-library.com/images/2018/3965934_usuario-aws-certification-transparent-png.png",
            name:"Ezequiel Soto",
            nacionalidad:"Colombia",
            git:"",
            linkedin:"",
            ocupation:"Full Stack Developer"
        },
        {
            img:"https://avatars.githubusercontent.com/u/80359162?v=4",
            name:"Neider Urbano",
            nacionalidad:"Colombia",
            git:"https://github.com/Neider-Urbano",
            linkedin:"https://www.linkedin.com/in/neider-julian-urbano-bastilla-30860b23b/",
            ocupation:"Full Stack Developer"
        }
    ];
    const tiger = {
        img:"https://avatars.githubusercontent.com/u/80359162?v=4",
        name:"Tiger Dev",
        nacionalidad:"Colombia",
        git:"",
        linkedin:"",
        ocupation:"Web Site Guardian"
    }
    const token=window.localStorage.getItem("dataUser");

        
    return (
        <>
            {token===null ? <NavBarNoLogin/> : <NavBarLogin />}
            
            <AboutUsContainer>
            <div className="text-4xl p-14">
                <div>
                    <h1>¿What is MusicCommerce??</h1>
                    <p className="mt-5">We are an e-commerce specialized in the sale and distribution of musical instruments. Our main objective is to offer a variety of quality products to our potential buyers, which can be purchased safely and thus, satisfy the needs of the market in question.</p>
                </div>

            </div>

                <AboutUsList>
                    <li>#</li>
                    <li>T</li>
                    <li>E</li>
                    <li>A</li>
                    <li>M</li>
                    <li>T</li>
                    <li>I</li>
                    <li>G</li>
                    <li>E</li>
                    <li>R</li>
                    <li>S</li>
                </AboutUsList>

                <MainProfileCard>
                   <ProfileCard developer={developers}/> 
                </MainProfileCard>
            </AboutUsContainer>

        </>
    )

}