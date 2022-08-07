import React, { useEffect, useState } from "react";
import axios from "./axios";
import { useNavigate } from "react-router-dom";
import "./Row.css";
import { useDispatch } from "react-redux";
import { addMovie } from "../features/movieSlice";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const base_url = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);
  // console.log(movies);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <div
                key={movie.id}
                className={`${"row_card"} ${isLargeRow && "row_cardLarge"}`}
                onClick={() => {
                  dispatch(addMovie({ id: movie.id }));
                  navigation("/media");
                }}
              >
                <img
                  key={movie.id}
                  className={`${"row_poster"} ${
                    isLargeRow && "row_posterLarge"
                  }`}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.title || movie.name || movie.original_name}
                />
                <p>{movie.title || movie.name || movie.original_name}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Row;
