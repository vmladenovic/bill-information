interface ShowAs {
    showAs?: string;
    uri?: string;
}

interface Sponsor {
    isPrimary: boolean;
    as: ShowAs;
    by: ShowAs;
}

export interface BillsResponse {
    head: {
        counts: {
            billCount: number;
            resultCount: number;
        };
    };
    results: [
        {
            bill: {
                billNo: 'string';
                billYear: 'string';
                billType: 'string';
                billTypeURI: 'string';
                shortTitleEn: 'string';
                shortTitleGa: 'string';
                longTitleEn: 'string';
                longTitleGa: 'string';
                method: 'string';
                methodURI: 'string';
                source: 'string';
                sourceURI: 'string';
                lastUpdated: 'string';
                originHouseURI: 'string';
                originHouse: {
                    showAs: 'string';
                    uri: 'string';
                };
                act: {
                    actNo: 'string';
                    actYear: 'string';
                    dateSigned: 'string';
                    shortTitleEn: 'string';
                    shortTitleGa: 'string';
                    longTitleEn: 'string';
                    longTitleGa: 'string';
                    uri: 'string';
                    statutebookURI: 'string';
                };
                amendmentLists: [
                    {
                        amendmentList: {
                            amendmentTypeUri: {
                                uri: 'string';
                            };
                            chamber: {
                                showAs: 'string';
                                uri: 'string';
                            };
                            date: 'string';
                            formats: {
                                pdf: {
                                    uri: 'string';
                                };
                                xml: {
                                    uri: 'string';
                                };
                            };
                            showAs: 'string';
                            stage: {
                                showAs: 'string';
                                uri: 'string';
                            };
                            stageNo: 'string';
                        };
                    },
                ];
                debates: [
                    {
                        chamber: {
                            showAs: 'string';
                            uri: 'string';
                        };
                        date: 'string';
                        debateSectionId: 'string';
                        showAs: 'string';
                        uri: 'string';
                    },
                ];
                events: [
                    {
                        event: {
                            chamber: {
                                chamberCode: 'string';
                                showAs: 'string';
                                uri: 'string';
                            };
                            dates: [
                                {
                                    date: 'string';
                                },
                            ];
                            eventURI: 'string';
                            showAs: 'string';
                            uri: 'string';
                        };
                    },
                ];
                mostRecentStage: {
                    event: {
                        stageCompleted: boolean;
                        stageOutcome: 'string';
                        progressStage: number;
                        showAs: 'string';
                        stageURI: 'string';
                        uri: 'string';
                        dates: [
                            {
                                date: 'string';
                            },
                        ];
                    };
                };
                relatedDocs: [
                    {
                        relatedDoc: {
                            date: 'string';
                            docType: 'string';
                            lang: 'string';
                            showAs: 'string';
                            uri: 'string';
                            formats: {
                                pdf: {
                                    uri: 'string';
                                };
                                xml: {
                                    uri: 'string';
                                };
                            };
                        };
                    },
                ];
                status: 'string';
                sponsors: {sponsor: Sponsor}[];
            };
        },
    ];
}
