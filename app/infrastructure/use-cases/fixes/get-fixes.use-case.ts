import { HttpAdapter } from "@/app/core/http/http.adapter";

export const GetFixesUseCase = async (fetcher: HttpAdapter): Promise<any> =>{
    try {
        
        let fixesReponse = await fetcher.get('/Reparaciones');
        return fixesReponse;

    } catch (error) {
        throw error;
    }
};