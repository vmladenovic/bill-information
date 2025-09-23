import type {
    GridFilterModel,
    GridGetRowsResponse,
    GridPaginationModel,
} from '@mui/x-data-grid';
import type {
    QueryFunctionContext,
    UseQueryOptions,
} from '@tanstack/react-query';
import {useQuery} from '@tanstack/react-query';
import type {BillsResponse} from '@/types/bill';
import {BILLS_API} from '@/constants/apis';

// Define query keys for React Query to manage caching and refetching
export const billKeys = {
    all: [{scope: 'bills'}] as const,
    search: (options: SearchOptions) =>
        [{...billKeys.all[0], entity: 'bill', options}] as const,
};

interface SearchOptions {
    paginationModel: GridPaginationModel;
    filterModel?: GridFilterModel;
}
type BillQueryKey = ReturnType<typeof billKeys.search>;

// A selector function to transform the API response into the format required by the DataGrid
// Also transformed data will be available from the ReactQuery cache for other usages
function getBillGridRowsSelector(data: BillsResponse): GridGetRowsResponse {
    return {
        rows:
            data?.results?.map(({bill}) => {
                const sponsors = bill.sponsors
                    ?.filter(({sponsor}) => !!sponsor.as?.showAs)
                    .map(({sponsor}) => sponsor.as.showAs);

                return {
                    id: `${bill.billNo}-${bill.billYear}`,
                    billNo: bill.billNo,
                    type: bill.billType,
                    status: bill.status,
                    sponsor: sponsors?.length ? sponsors.join(', ') : '',
                    titleEn: bill.act?.shortTitleEn,
                    titleGa: bill.act?.shortTitleGa,
                };
            }) || [],
        rowCount: data?.head.counts?.billCount || 0,
    };
}

// Function to fetch bills from the API based on pagination and filtering options
async function fetchBills({
    queryKey: [{options}],
}: QueryFunctionContext<BillQueryKey>): Promise<BillsResponse> {
    const {page, pageSize} = options.paginationModel;

    // Construct query parameters for pagination and filtering
    // Note: The API currently does not support filtering for the Type column, but this is prepared for future use
    options.filterModel?.items?.forEach((item) => {
        params.append(item.field, item.value as string);
    });

    // Calculate skip and limit for pagination
    const params = new URLSearchParams({
        skip: (page * pageSize).toString(),
        limit: pageSize.toString(),
    });

    const res = await fetch(`${BILLS_API}/legislation?${params.toString()}`);

    return res.json();
}

// Since Query is a special hook I like to keep them in this folder
export function useBillsQuery<T = BillsResponse>(
    searchOptions: SearchOptions,
    options?: Partial<
        UseQueryOptions<
            BillsResponse,
            unknown,
            T,
            ReturnType<typeof billKeys.search>
        >
    >,
) {
    return useQuery({
        queryKey: billKeys.search(searchOptions),
        queryFn: fetchBills,
        staleTime: 1000 * 30, // half minute
        ...options,
    });
}

export function useGetBillGridRowsQuery(searchOptions: SearchOptions) {
    return useBillsQuery(searchOptions, {select: getBillGridRowsSelector});
}
