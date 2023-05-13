import "./About.css"
import { AboutCard } from "./AboutCard"
import Father from "../../Settings/assets/images/p0btx726-removebg-preview.png"
import Tops from "../../Settings/assets/images/moon knight.jpg"
import Thor from "../../Settings/assets/images/thor love of thunder.jpg"
export const About = () => {
    return(
        <div id="about" className="public_about">
        <div className="container_fluid">
            <h1>Dasturda nimalar mujassam ? </h1>
            <ul className="public_about_cards">
                <AboutCard image={Father} name={"Top Rating"} disc={"Dasturda hozirki vaqtdagi eng sarali bo'lgan top kinolarni ko'rasiz"} />
                <AboutCard image={Thor} name={"Premyera"} disc={"Dasturda hozirki vaqtdagi eng ohirgi premyera bo'lgan kinolarni ko'rasiz"}/>
                <AboutCard image={Tops} name={"Ommabop"} disc={"Dasturda hozirki vaqtdagi eng ommabop bo'lgan top kinolarni ko'rasiz"}/>
            
            </ul>
        </div>
        </div>
    )
}