import axios from "axios";

export const fetchApi = axios.create({
    baseURL:"https://api.themoviedb.org/3/movie/"
})