export type FileReportValues = {
    id?:number;
    uploaderId: string;
    downloadsTotal: number;
    downloadsToday: number;
    acumulatedSizeTotal: number;
    acumulatedSizeDay: number;
}

export type DriveAccountValues = {
    id: number;
    accountId: string;
    downloadsTotal: number;
    downloadsToday: number;
    acumulatedSizeTotal: number;
    acumulatedSizeDay: number;
}