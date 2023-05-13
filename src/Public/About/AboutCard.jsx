export const AboutCard = ({image, name, disc}) => {
    return(
        <li className="public_about_card">
            <img className="public_about_card_image" src={image} alt="Intro img" />
            <div className="public_about_card_intro">
                <h3>{name}</h3>
                <p>{disc}</p>
            </div>
        </li>
    )
}