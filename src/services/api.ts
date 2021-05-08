import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.1.112:3333/",
});
 
export default api;
// Nesse arquivo eu estou usando o json-server pra simular uma api