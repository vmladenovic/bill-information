export interface Bill {
    id: string;
    billNo: string;
    status: string;
    titleEn: string;
    titleGa: string;
    sponsor: string;
    type: string;
}

export enum BillTabs {
    All = 0,
    Favourite = 1,
}

export interface BillsState {
    activeBill?: Bill;
    favourites: Bill[];
    tab: BillTabs;
}
