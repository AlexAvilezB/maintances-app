import { HttpAdapter } from "@/app/core/http/http.adapter";
import { CreateWorkerDto } from "@/app/domain/interfaces/create-worker-dto.interface";

export const PostWorkerUseCase = async (fetcher: HttpAdapter, body: CreateWorkerDto): Promise<any> =>{
    try {
        
        let workersReponse = await fetcher.post('/Trabajadores', body);
        return workersReponse;

    } catch (error) {
        throw error;
    }
};