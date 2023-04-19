import React from "react";
import { useParams } from "react-router-dom";

/*Config*/
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";

/*Components*/
import Grid from "./Grid";
import Spinner from "./Spinner";
import BreadCrumb from "./BreadCrumb.js";
import MovieInfo from "./MovieInfo.js";
import MovieInfoBar from "./MovieInfoBar";
import Actor from "./Actor";

/*Hook*/
import { useMovieFetch } from "../hooks/useMovieFetch";

/*Image*/
import NoImage from "../images/no_image.jpg";

const Movie = () => {
  const { movieId } = useParams();
  /*we called it movieId ia App.js hence we destructure it by that name */
  /*We are getting the movieId from route(i.e url) using the useParams() hook */

  const { state: movie, loading, error } = useMovieFetch(movieId);

  // console.log("selected movie is", movie);

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header="Actors">
        {movie.actors.map((actor) => (
          <Actor
            key={actor.credit_id}
            name={actor.name}
            character={actor.character}
            imageUrl={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                : NoImage
            }
          />
        ))}
      </Grid>
    </>
  );
};

export default Movie;

// Refactoring using Class Components

// import React from "react";
// import { useParams } from "react-router";

// /*API*/
// import API from "../API";

// /*Config*/
// import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";

// /*Components*/
// import Grid from "./Grid";
// import Spinner from "./Spinner";
// import BreadCrumb from "./BreadCrumb.js";
// import MovieInfo from "./MovieInfo.js";
// import MovieInfoBar from "./MovieInfoBar";
// import Actor from "./Actor";

// /*Image*/
// import NoImage from "../images/no_image.jpg";

// class Movie extends React.Component {
//   state = {
//     movie: {},
//     loading: true,
//     error: false,
//   };

//   fetchMovie = async () => {
//     const { movieId } = this.props.params;

//     try {
//       this.setState({ error: false, loading: true });

//       const movie = await API.fetchMovie(movieId);
//       const credits = await API.fetchCredits(movieId);

//       /*Get Directors Only*/
//       const directors = credits.crew.filter(
//         (member) => member.job === "Director"
//       );

//       this.setState({
//         movie: {
//           ...movie,
//           actors: credits.cast,
//           directors,
//         },
//         loading: false,
//       });
//     } catch (error) {
//       this.setState({ error: true, loading: false });
//     }
//   };

//   componentDidMount() {
//     this.fetchMovie();
//   }

//   render() {
//     const { movie, loading, error } = this.state;

//     if (loading) return <Spinner />;
//     if (error) return <div>Something went wrong...</div>;

//     return (
//       <>
//         <BreadCrumb movieTitle={movie.original_title} />
//         <MovieInfo movie={movie} />
//         <MovieInfoBar
//           time={movie.runtime}
//           budget={movie.budget}
//           revenue={movie.revenue}
//         />
//         <Grid header="Actors">
//           {movie.actors.map((actor) => (
//             <Actor
//               key={actor.credit_id}
//               name={actor.name}
//               character={actor.character}
//               imageUrl={
//                 actor.profile_path
//                   ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
//                   : NoImage
//               }
//             />
//           ))}
//         </Grid>
//       </>
//     );
//   }
// }

// const MovieWithParams = (props) => <Movie {...props} params={useParams()} />;

// export default MovieWithParams;
