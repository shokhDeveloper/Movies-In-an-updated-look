import { Link, useNavigate } from "react-router-dom";
import "./MovieCarousel.css";
import { Like } from "../Like";
import { useState } from "react";
import { BASE_IMAGE } from "../Settings";
export const MovieCarousel = ({ id, img, name, year, item, likes }) => {
  const [like, setLike] = useState(false);
  const navigate = useNavigate()
  const handleClick = (event) => {
    if(event.target.matches(".like_btn")){
        return false
    }else{
        navigate(`/movie/${id}`)
    }
  }
  return (
    <>
      {likes ? (
        <div onClick={handleClick} className="movie_carousel" style={{backgroundImage: `url(${img ? BASE_IMAGE +  img : 'https://picum.photos/200/200'})`, borderRadius: "10px", border: "1px solid goldenrod", backgroundPosition: "center"}}>
          <Like like={like} setlike={setLike} item={item}/>
          <div className="movie_carousel_intro">
            <h2>{name?.split(" ")?.length > 3 ? name.split(" ").slice(0, 3).join(" ") : name }</h2>
            <p>{year}</p>
          </div>
        </div>
      ) : (
        <Link  to={`/movie/${id}`} className="movie_carousel" >
          <img src={img} alt=""  />
          <div className="movie_carousel_intro movie_carousel_intro_texts">
            <h2>{name?.split(" ")?.length > 3 ? name.split(" ").slice(0, 3).join(" ") : name }</h2>
            <p>{year}</p>
          </div>
        </Link>
      )}
    </>
  );
};
