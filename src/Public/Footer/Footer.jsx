import "./Footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faInstagram, faTelegram, faGithub} from "@fortawesome/free-brands-svg-icons"
import {Bounce} from "react-reveal"
export const Footer = () => {
    return(
        <footer className="public_footer">
            <div className="container_fluid">
               <Bounce left duration={1500} delay={500}>
                <div className="public_footer_items">
                    <h3 className="public_footer_title">Bog'lanish uchun</h3>
                    <div className="public_footer_links">
                        <div className="public_footer_link">    
                        <a target="blank" style={{color: "#c13584"}} href="https://www.instagram.com/shokhijakhon_dev/">
                            <FontAwesomeIcon icon={faInstagram}/>
                        </a>
                            <span>Instagram</span> 
                        </div>
                        <div className="public_footer_link">    
                        <a target="blank"  href="https://t.me/shokhijakhon_dev">
                            <FontAwesomeIcon icon={faTelegram}/>
                        </a>
                            <span>Telegram</span> 
                        </div>
                        <div className="public_footer_link">    
                        <a target="blank" href="https://github.com/shokhDeveloper">
                            <FontAwesomeIcon icon={faGithub}/>
                        </a>
                            <span>Git hub</span> 
                        </div>
                    </div>
                </div>
                </Bounce> 
            </div>
        </footer>
    )
}