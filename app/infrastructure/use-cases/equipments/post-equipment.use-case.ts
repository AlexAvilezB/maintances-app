import { HttpAdapter } from "@/app/core/http/http.adapter";
import { CreateEquipmentDto } from "@/app/domain/interfaces/create-equipment-dto.interface";

export const PostEquipmentUseCase = async (fetcher: HttpAdapter, body: CreateEquipmentDto): Promise<any> =>{
    try {
        
        let equipmentResponse = await fetcher.post('/Equipo', body);
        return equipmentResponse;

    } catch (error) {
        throw error;
    }
};