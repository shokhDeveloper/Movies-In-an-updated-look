import { BASE_IMAGE } from "../../Settings"
import Slider from "react-slick"
import "./slick-movie.css"
import "./slick-movie-theme.css"
import { Link } from "react-router-dom"
export const Trend = ({movies}) => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 2000,
        cssEase: "linear"
      };
    return(
        <>
            <Slider {...settings}>
            {movies?.map(item => {
                return(
                <Link to={`/movie/${item.id}`}    className="movie" key={item.id}>
                    <img src={`${BASE_IMAGE+item.poster_path}`} alt="" />
                    <div className="movie_intro">
                        <h3>{item.title.split(" ").slice(0,3).join(" ")} ... </h3>
                    </div>
                </Link>
                )
            })}
            </Slider>
        </>
    )
}