import { ApiFetcher } from "@/app/core/repository/api.adapter";
import { GetWorkersUseCase } from "@/app/infrastructure/use-cases/workers/get-workers.use-case";
import { useQuery } from "@tanstack/react-query"

export const UseWorkers = () => {

    const UseWorkersQuery = useQuery(
        {
            queryKey: ['workers'],
            queryFn: () => GetWorkersUseCase(ApiFetcher),
            staleTime: 1000 * 60,
        }
    );

    return {
        UseWorkersQuery
    }
}