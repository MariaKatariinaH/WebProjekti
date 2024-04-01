import axios from "axios";
import { baseurl } from "../constants/url.constants";

const httpModule = axios.create({
    baseURL: baseurl,
});

export default httpModule;