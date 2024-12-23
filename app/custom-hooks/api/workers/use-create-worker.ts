import { ApiFetcher } from "@/app/core/repository/api.adapter";
import { CreateWorkerDto } from "@/app/domain/interfaces/create-worker-dto.interface";
import { PostWorkerUseCase } from "@/app/infrastructure/use-cases/workers/post-worker.use-case";
import { useMutation } from "@tanstack/react-query";

export const UseCreateWorker = () => {

    const UseCreateWorkerQuery = useMutation(
        {
            mutationKey: ['create-worker'],
            mutationFn: (data: CreateWorkerDto) => PostWorkerUseCase(ApiFetcher, data),
        }
    );

    return {
        UseCreateWorkerQuery
    }
};