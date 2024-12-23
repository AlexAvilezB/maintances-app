import { ApiFetcher } from "@/app/core/repository/api.adapter";
import { GetMaintenancesUseCase } from "@/app/infrastructure/use-cases/maintenances/get-maintenances.use-case";
import { useQuery } from "@tanstack/react-query"

export const UseMaintenances= () => {

    const UseMaintenancesQuery = useQuery(
        {
            queryKey: ['maintenances'],
            queryFn: () => GetMaintenancesUseCase(ApiFetcher),
            staleTime: 1000 * 60,
        }
    );

    return {
        UseMaintenancesQuery
    }
}