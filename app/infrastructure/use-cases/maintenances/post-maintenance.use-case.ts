import { HttpAdapter } from "@/app/core/http/http.adapter";
import { CreateMaintenanceDto } from "@/app/domain/interfaces/create-maintenance-dto.interface";

export const PostMaintenanceUseCase = async (fetcher: HttpAdapter, body: CreateMaintenanceDto): Promise<any> =>{
    try {
        
        let maintenanceResponse = await fetcher.post('/Mantenimiento', body);
        return maintenanceResponse;

    } catch (error) {
        throw error;
    }
};