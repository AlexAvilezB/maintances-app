import { HttpAdapter } from "@/app/core/http/http.adapter";

export const GetMaintenancesUseCase = async (fetcher: HttpAdapter): Promise<any> =>{
    try {
        
        let maintencesReponse = await fetcher.get('/Mantenimiento');
        return maintencesReponse;

    } catch (error) {
        throw error;
    }
};