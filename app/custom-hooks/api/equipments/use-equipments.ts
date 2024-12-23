import { ApiFetcher } from "@/app/core/repository/api.adapter";
import { GetEquipmentsUseCase } from "@/app/infrastructure/use-cases/equipments/get-equipments.use-case";
import { useQuery } from "@tanstack/react-query"

export const UseEquipments = () => {

    const UseEquipmentsQuery = useQuery(
        {
            queryKey: ['equipments'],
            queryFn: () => GetEquipmentsUseCase(ApiFetcher),
            staleTime: 1000 * 60,
        }
    );

    return {
        UseEquipmentsQuery
    }
}