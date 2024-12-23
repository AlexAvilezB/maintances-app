import { AxiosAdapter } from "../http/axios.adapter";

const baseURL: string = 'https://www.registroreparacionesmantenmientos.somee.com/api/';  

export const ApiFetcher = new AxiosAdapter({ 
    baseURL: baseURL,
    headers: {
        'Accept-Language': 'es',
    }
});