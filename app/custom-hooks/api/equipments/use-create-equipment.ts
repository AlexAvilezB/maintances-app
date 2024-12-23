import { ApiFetcher } from "@/app/core/repository/api.adapter";
import { CreateEquipmentDto } from "@/app/domain/interfaces/create-equipment-dto.interface";
import { PostEquipmentUseCase } from "@/app/infrastructure/use-cases/equipments/post-equipment.use-case";
import { PostWorkerUseCase } from "@/app/infrastructure/use-cases/workers/post-worker.use-case";
import { useMutation } from "@tanstack/react-query";

export const UseCreateEquipment = () => {

    const UseCreateEquipmentQuery = useMutation(
        {
            mutationKey: ['create-equipment'],
            mutationFn: (data: CreateEquipmentDto) => PostEquipmentUseCase(ApiFetcher, data),
        }
    );

    return {
        UseCreateEquipmentQuery
    }
};