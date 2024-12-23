import { ApiFetcher } from "@/app/core/repository/api.adapter";
import { CreateMaintenanceDto } from "@/app/domain/interfaces/create-maintenance-dto.interface";
import { PostMaintenanceUseCase } from "@/app/infrastructure/use-cases/maintenances/post-maintenance.use-case";
import { useMutation } from "@tanstack/react-query";

export const UseCreateMaintenance = () => {

    const UseCreateMaintenanceQuery = useMutation(
        {
            mutationKey: ['create-maintenance'],
            mutationFn: (data: CreateMaintenanceDto) => PostMaintenanceUseCase(ApiFetcher, data),
        }
    );

    return {
        UseCreateMaintenanceQuery
    }
};