/*Config*/
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";

/*Components*/
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import Button from "./Button";

/*Hook*/
import { useHomeFetch } from "../hooks/useHomeFetch";

/*Image*/
import NoImage from "../images/no_image.jpg";

const Home = () => {
  const { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore } =
    useHomeFetch();
  // console.log("state in home", state);

  if (error) return <div>Something went wrong...</div>;

  return (
    <>
      {!searchTerm && state.results[0] ? (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? "Search Results" : "Popular Movies"}>
        {state.results.map((movie) => (
          <Thumb
            key={movie.id}
            clickable
            image={
              movie.poster_path
                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                : NoImage
            }
            movieId={movie.id}
          />
        ))}
      </Grid>
      {loading && <Spinner />}
      {state.page < state.total_pages && !loading && (
        <Button text="Load More" callback={() => setIsLoadingMore(true)} />
      )}
    </>
  );
};

export default Home;

// Refactoring the code using Class Components

// import React from "react";

// /*Config*/
// import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";

// /*API*/
// import API from "../API";

// /*Components*/
// import HeroImage from "./HeroImage";
// import Grid from "./Grid";
// import Thumb from "./Thumb";
// import Spinner from "./Spinner";
// import SearchBar from "./SearchBar";
// import Button from "./Button";

// /*Image*/
// import NoImage from "../images/no_image.jpg";

// const initialState = {
//   page: 0,
//   results: [],
//   total_pages: 0,
//   total_results: 0,
// };

// class Home extends React.Component {
//   state = {
//     movies: initialState,
//     searchTerm: "",
//     isLoadingMore: false,
//     loading: false,
//     error: false,
//   };

//   fetchMovies = async (page, searchTerm = "") => {
//     try {
//       this.setState({ error: false, loading: true });

//       const movies = await API.fetchMovies(searchTerm, page);

//       this.setState((prev) => ({
//         ...prev,
//         movies: {
//           ...movies,
//           results:
//             page > 1
//               ? [...prev.movies.results, ...movies.results]
//               : [...movies.results],
//         },
//         loading: false,
//       }));
//     } catch (error) {
//       this.setState({ error: true, loading: false });
//     }
//   };

//   handleSearch = (searchTerm) => {
//     this.setState({ movies: initialState, searchTerm }, () =>
//       this.fetchMovies(1, this.state.searchTerm)
//     );
//   };

//   handleLoadMore = () =>
//     this.fetchMovies(this.state.movies.page + 1, this.state.searchTerm);

//   componentDidMount() {
//     this.fetchMovies(1);
//   }

//   render() {
//     const { searchTerm, movies, loading, error } = this.state;

//     if (error) return <div>Something went wrong...</div>;

//     return (
//       <>
//         {!searchTerm && movies.results[0] ? (
//           <HeroImage
//             image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`}
//             title={movies.results[0].original_title}
//             text={movies.results[0].overview}
//           />
//         ) : null}
//         <SearchBar setSearchTerm={this.handleSearch} />
//         <Grid header={searchTerm ? "Search Results" : "Popular Movies"}>
//           {movies.results.map((movie) => (
//             <Thumb
//               key={movie.id}
//               clickable
//               image={
//                 movie.poster_path
//                   ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
//                   : NoImage
//               }
//               movieId={movie.id}
//             />
//           ))}
//         </Grid>
//         {loading && <Spinner />}
//         {movies.page < movies.total_pages && !loading && (
//           <Button text="Load More" callback={() => this.handleLoadMore(true)} />
//         )}
//       </>
//     );
//   }
// }

// export default Home;
