import { HttpAdapter } from "@/app/core/http/http.adapter";

export const GetWorkersUseCase = async (fetcher: HttpAdapter): Promise<any> =>{
    try {
        
        let workersReponse = await fetcher.get('/Trabajadores');
        return workersReponse;

    } catch (error) {
        throw error;
    }
};