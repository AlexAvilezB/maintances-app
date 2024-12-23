import { HttpAdapter } from "@/app/core/http/http.adapter";

export const GetEquipmentsUseCase = async (fetcher: HttpAdapter): Promise<any> =>{
    try {
        
        let equipmentsReponse = await fetcher.get('/Equipo');
        return equipmentsReponse;

    } catch (error) {
        throw error;
    }
};