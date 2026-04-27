import { useEffect, useState } from "react";
import { fetchApi } from "./user.api";

export default function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [mainpage, setMainpage] = useState("top_rated");
  const [search, setSearch] = useState("");
  const [score, setScore] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000000000);

  useEffect(() => {
    async function datas() {
      try {
        const data = await fetchApi(
          `${mainpage}?api_key=dcea1fd7b3e65d34387ad6de7ef9cc5e&page=${page}`,
        );
        if (data.status === 200) {
          setUsers(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    datas();
  }, [page, mainpage]);

  function prev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }
  function next() {
    setPage(page + 1);
  }
  function topmovie() {
    setMainpage("top_rated");
  }
  function popularmovie() {
    setMainpage("popular");
  }

  function upcomingmovie() {
    setMainpage("upcoming");
  }
  if(max == ""){
    setMax(1000000000)
  }
  return (
    <>
      <div>
        <div className="header-inner">
          <div className="container rel">
            <div className="row2">
              <button onClick={topmovie} value="top_rated" className="btns">
                Top kinolar
              </button>
              <button onClick={popularmovie} value="popular" className="btns">
                popular
              </button>
              <button onClick={upcomingmovie} value="upcoming" className="btns">
                upcoming
              </button>
            </div>
            <div className="fl">
              <div className="row1">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="search"
                  id="search"
                />
              </div>
              <div className="row1">
                <input
                  onChange={(e) => setMin(e.target.value)}
                  type="number"
                  placeholder="min"
                  id="min"
                />
                <input
                  onChange={(e) => setMax(e.target.value)}
                  type="number"
                  placeholder="max"
                  id="max"
                />
              </div>
              <div className="row1">
                <input
                  onChange={(e) => setScore(e.target.value)}
                  type="number"
                  placeholder="score"
                  id="score"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="append">
            {users?.results?.map((user, index) => {
              if (!search && !score && !min && !max) {
                return (
                  <div className="movie" key={index}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${user.backdrop_path}`}
                      alt=""
                    />
                    <div className="movie-info">
                      <h3>{user.title}</h3>
                      <span className="orange">
                        {Math.floor(user.vote_average)}
                      </span>
                    </div>
                    <span className="date">{user.release_date}</span>
                  </div>
                );
              }
              if (
                user.title.includes(search) &&
                Math.floor(user.vote_average) >= score &&
                user.release_date.replace(/-/g, "") > min &&
                user.release_date.replace(/-/g, "") < max 
              ) {
                return (
                  <div className="movie" key={index}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${user.backdrop_path}`}
                      alt=""
                    />
                    <div className="movie-info">
                      <h3>{user.title}</h3>
                      <span className="orange">
                        {Math.floor(user.vote_average)}
                      </span>
                    </div>
                    <span className="date">{user.release_date}</span>
                  </div>
                );
              }
            })}
            <div className="movie">
              <div className="movie-info">
                <h3>Fast & amp; Furious Presents: Hobbs & amp; Shaw</h3>
                <span className="orange">6.9</span>
              </div>
              <span className="date">2021-09-21</span>
            </div>
          </div>
          <div className="pn">
            <button onClick={prev} className="prev">
              prev
            </button>
            <span className="title">{page}</span>
            <button onClick={next} className="next">
              next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
