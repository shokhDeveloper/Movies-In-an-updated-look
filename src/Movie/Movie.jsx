import "./Movie.css";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BASE_IMAGE, getApi } from "../Settings";
import {Fade} from "react-reveal"
import { Like } from "../Like";
import { useQuery } from "react-query";
import { Trailer } from "../Trailer";
import { Credits } from "./Credits";

export const Movuie = () => {
  const { id } = useParams();
  const [movieId, setMovieId] = useState(0);
  const [movieName, setMovieName] = useState("")
  const [direktor, setDirektor] = useState([]);
  const [producer, setProducer] = useState([]);
  const [company, setCompany] = useState([]);
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const handleKey = (event) => {
    if (event.keyCode === 27) {
      navigate(-1);
    }
  };
  const getMovie = useCallback(async () => {
    const request = await getApi.getMovie(id);
    const response = await request.data;
    setCompany(response.production_companies[0]);
    setMovieId(response.id);
    setMovieName(response.title)
    return [response]
  }, [id]);
  const handleActor = useCallback(async () => {
      if (movieId !== 0) {
          const request = await getApi.getCredits(movieId);
          const response = await request.data;
          console.log(response.crew)
          setDirektor(response?.crew[2]);
          setProducer(response?.crew[19]);
        }
    }, [movieId]);
    useEffect(() => {
        window.addEventListener("keyup", handleKey);
        return () => window.removeEventListener("keyup", handleKey);
    }, []);
    useEffect(() => {
        handleActor();
    }, [handleActor]);
    const {isLoading, isError, isSuccess, data} = useQuery(`movie/${id}`, getMovie)
    return (
        <div className="movie_page">
      <div className="container_fluid">
        <div className="home_page_title">
          <h1>Movies App</h1>
        </div>
        {isLoading && (
            <h1 className="white" >Yuklanmoqda</h1>
        )}
        {isSuccess && (
            <React.Fragment>
                {data?.map((item) => {
                    return (
                      <div className="movie_page__items">
                          <div className="movie_page__image" style={{backgroundImage: `url(${BASE_IMAGE+item.poster_path})`}}>
                              <Like like={like} setlike={setLike} item={item}/>
                          </div>
                          <div className="movie_page__texts">
                              <h2>{item?.title}</h2>
                              <p>{item.overview}</p>
                          </div>
                          <div className="movie_page__avtors">
                              <h3>Company = <span>{company?.name}</span></h3>
                              <h3>Direktor = <span>{direktor?.name?.split(" ")[0]}.{direktor?.name?.split(" ")[1][0]}</span></h3>
                              <h3>Producer = <span>{producer?.name?.split(" ")[0]}.{producer?.name?.split(" ")[1][0]}</span></h3>
                          </div>
                      </div>
                    );
                })}
                <a className="movie_page_trailer trailer"  href="#trailer">Trailer</a>
            </React.Fragment>
            )}
      </div>
      {isError && (
        <h1 className="error">Xatolik</h1>
      )}
      {isSuccess && (
        <>
        <Trailer id={id}/>
        <Credits id={movieId} name={movieName}/> 
        </>
      )}

    </div>
  );
};
