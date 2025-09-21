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

async function fetchBills({
    queryKey: [{options}],
}: QueryFunctionContext<BillQueryKey>): Promise<BillsResponse> {
    const {page, pageSize} = options.paginationModel;

    options.filterModel?.items?.forEach((item) => {
        params.append(item.field, item.value as string);
    });

    const params = new URLSearchParams({
        skip: (page * pageSize).toString(),
        limit: pageSize.toString(),
    });

    const res = await fetch(`${BILLS_API}/legislation?${params.toString()}`);

    return res.json();
}

// Since Query is a special hook I like to keep them in a separate
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
        ...options,
    });
}

export function useGetBillGridRowsQuery(searchOptions: SearchOptions) {
    return useBillsQuery(searchOptions, {select: getBillGridRowsSelector});
}
