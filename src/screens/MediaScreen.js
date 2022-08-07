import React, { useEffect, useState } from "react";
import "./MediaScreen.css";
import axios from "../components/axios";
import { useSelector } from "react-redux";
import { selectMovie } from "../features/movieSlice";
import Nav from "../components/Nav";
import YouTube from "react-youtube";
import { motion, AnimatePresence, AnimateSharedLayout, usePresence } from "framer-motion";

const MediaScreen = () => {
  const [movie, setMovie] = useState([]);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [selectCast, setSelectedCast] = useState(null);
  const [isPresent, safeToRemove] = usePresence()
  const API_KEY = "73f14887e60a6d5c31ac96279c761f7f";
  const movieId = useSelector(selectMovie);
  const fetchUrl = `/movie/${movieId.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits,reviews`;
  const trailer = movie?.videos?.results?.find(
    (vid) => vid.name === "Official Trailer"
  );
  const fetchCast = async(id)=>{
    const request = await axios.get(`/person/${id}?api_key=${API_KEY}&language=en-US`);
    setSelectedCast(request.data)
    return request;
  }
  // const actor = movie?.videos?.results?.find(
  //   (vid) => vid.name === "Official Trailer"
  // );
  const imageBase_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    console.log(isPresent)
    !isPresent && setTimeout(safeToRemove, 1000)
  }, [isPresent])


  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovie(request.data);
      return request;
    };
    fetchData();
  }, [fetchUrl]);
  // console.log(movie)
  // console.log(movie.id)
  return (
    <>
      <Nav />
      <header
        className="media_banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="media_banner_contents">
          {playTrailer ? (
            <div className="trailer_container">
              <YouTube
                className="official_trailer"
                iframeClassName="official_trailer_iframe"
                videoId={trailer.key}
              />
              <button
                className="media_banner_button_close"
                onClick={() => setPlayTrailer(false)}
              >
                close
              </button>
            </div>
          ) : (
            <>
              <h1 className="media_banner_title">
                {movie?.title || movie?.name || movie?.original_name}
              </h1>
              <div className="media_banner_buttons">
                <button
                  className="media_banner_button_play"
                  onClick={() => setPlayTrailer(true)}
                >
                  play
                </button>
              </div>
              <h1 className="media_banner_discription">{movie?.overview}</h1>
            </>
          )}
        </div>
        <div className="media_banner--fadeBottom" />
      </header>
      {/* <div className="media">hi</div> */}
      <div className="media_cast">
        <h2>Cast</h2>
      <AnimateSharedLayout type="crossfade">
        <div className="media_cast_details">
          {movie?.credits?.cast?.map((cast) => (
            <>
              <div
                // layoutId={cast.id}
                key={cast.id}
                className="media_cast_card"
                // exit={{}}
                // onClick={() => {
                //   dispatch(addMovie({ id: movie.id }));
                //   navigation("/media");s
                // }}
                onClick={()=> fetchCast(cast.id)}
              >
                <img
                  className="media_cast_profile"
                  src={`${
                    cast?.profile_path
                      ? imageBase_url + cast?.profile_path
                      : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                  }`}
                  alt={cast.name || cast.original_name}
                />
                <p className="media_cast_name">
                  {cast.name || cast.original_name}
                </p>
                <p className="media_cast_character">{cast.character}</p>
              </div>
            </>
          ))}
        </div>
        <AnimatePresence>
          {selectCast && (
            <motion.div
              layoutId={selectCast.id}
              key="rk17"
              className="media_cast_card_anime"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.2, delay: 0.15 }}
              style={{ pointerEvents: "auto" }}
              onClick={() => {setSelectedCast(null);console.log(selectCast)}}
            >
              <motion.img
                className="media_cast_profile"
                src={`${
                  selectCast?.profile_path
                    ? imageBase_url + selectCast?.profile_path
                    : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                }`}
                // src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                // alt={cast.name || cast.original_name}
              />
              <motion.p className="media_cast_name">
                {/* {cast.name || cast.original_name} */}
                Ravikant
              </motion.p>
              <motion.p className="media_cast_character">
                {/* {cast.character} */}
                Hero
              </motion.p>
              <motion.button
                className="media_cast_button_close_anime"
                onClick={() => setSelectedCast(null)}
              >
                x
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
      </div>
      {/* <div className="media_reviews">
        <h2>Reviews</h2>
        <div className="media_reviews_details">
          {movie?.reviews?.results?.map((review) => (
            <div className="media_review_card">
              <div className="media_review_card_details">
                <img
                  className="media_review_profile"
                  src={`${
                    truncateImg(review?.author_details?.avatar_path, 6) ===
                    "/https"
                      ? truncateImgPath(review?.author_details?.avatar_path)
                      : imageBase_url + review?.author_details?.avatar_path
                  }`}
                  alt={review?.author}
                />
                <div className="media_review_authur">
                  <p className="media_review_name">
                    {review?.author ||
                      review?.author_details?.name ||
                      review?.author_details?.username}
                  </p>
                  <p className="media_review_rating">
                    <span>
                      <img
                        className="media_rating_logo"
                        src="https://cdn-icons-png.flaticon.com/512/25/25297.png"
                        alt=""
                      />
                    </span>
                    {review?.author_details?.rating || "1"}
                  </p>
                </div>
              </div>
              <div className="media_review_card_content">
                <p dangerouslySetInnerHTML={truncate(review?.content, 550)} />
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <h2 className="media_youtube_heading">Trailers & Clips</h2>
      <div className="media_youtube">
        {movie?.videos?.results?.map((video) => (
          <YouTube
            className="media_youtube_card"
            iframeClassName="media_youtube_iframe"
            videoId={video.key}
          />
        ))}
      </div>
    </>
  );
};

export default MediaScreen;
