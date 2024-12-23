import { ApiFetcher } from "@/app/core/repository/api.adapter";
import { GetFixesUseCase } from "@/app/infrastructure/use-cases/fixes/get-fixes.use-case";
import { useQuery } from "@tanstack/react-query"

export const UseFixes = () => {

    const UseFixesQuery = useQuery(
        {
            queryKey: ['fixes'],
            queryFn: () => GetFixesUseCase(ApiFetcher),
            staleTime: 1000 * 60,
        }
    );

    return {
        UseFixesQuery
    }
}