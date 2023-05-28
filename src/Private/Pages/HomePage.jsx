import "./HomePage.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { BASE_IMAGE, Context, getItem } from "../../Settings";
import { getApi } from "../../Settings";
import { Fade } from "react-reveal";
import { Like as LikeComponent } from "../../Like";
import Like from "../../Settings/assets/images/Like.png";
import NotLike from "../../Settings/assets/images/Not_Like.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { Trend } from "./Trend";
import { Bar } from "./Bar";
export const HomePage = ({ load }) => {
  const { user, popularPage } = useContext(Context);
  const [data, setData] = useState([]);
  const [like, setlike] = useState(false);  
  const [movies, setMovies] = useState([])
  const navigate = useNavigate()
  const getPopularMovie = useCallback(async () => {
    const request = await getApi?.getPopular(popularPage);
    const response = await request.data;
     setData([response.results[0]]);
     response?.results?.splice(0,1)
     setMovies(response?.results)
  }, [user.id]);
  useEffect(() => {
    getPopularMovie();
  }, [getPopularMovie]);
  let idx = 0;
  return (
    <div className="home_page">
      <div className="container_fluid">
        <div className="home_page_title">
        <h1 >Movies App</h1>
        </div>
        <div className="home_page_items">
          <div className="home_page_item_movies">
            {data.map((item) => {
              console.log(item);
              return (
                <div onClick={() => navigate(`/movie/${item.id}`) } className="home_page_item_movie" style={{backgroundImage: `url(${BASE_IMAGE+item.backdrop_path})`}}>
                  <div className="home_page_item_movie__texts">
                    <h4>{item.title}</h4>
                    <h5>{item.orginal_title}</h5>
                    <p>
                      {item.overview.split(" ").length > 20
                        ? ` ${item.overview
                            .split(" ")
                            .slice(0, 20)
                            .join(" ")} ... `
                        : item.overview}
                    </p>
                  </div>
                  <div className="movie_settins">
                    <NavLink to={`/movie/${item.id}`}  className="trailer">Trailerni </NavLink>
                    <LikeComponent like={like} setlike={setlike} item={item}/>
                  </div>
                </div>
              );
            })} 
            <h3 className="trending_home_page_title">Trending <span className="movies_text">Movies</span></h3>
            <div className="home_page_trending">
              <Trend movies={movies}/>  
            </div>
          </div>
          <div className="home_page_item_bar">
            <Bar/>
          </div>
        </div>
      </div>
    </div>
  );
};
