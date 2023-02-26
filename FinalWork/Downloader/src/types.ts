export type DownloadFileValues = {
  uploaderId: string;
  driveId: string;
  name: string;
  webViewLink: string;
  webContentLink: string;
  size: number;
  accountId: string;
};

export type AccountStatsValues = {
  id: number;
  accountId: string;
  downloadsTotal: number;
  downloadsToday: number;
  acumulatedSizeTotal: number;
  acumulatedSizeDay: number;
  filesize: number;
}

export type FileReportValues = {
  id: number;
  uploaderId: string;
  downloadsTotal: number;
  downloadsToday: number;
  acumulatedSizeTotal: number;
  acumulatedSizeDay: number;
  size: number;
}

export type NewFileReportValues = {
  uploaderId: string;
  downloadsTotal: number;
  downloadsToday: number;
  acumulatedSizeTotal: number;
  acumulatedSizeDay: number;
  size: number;
}

export type NewAccountValues = {
  accountId: string;
  downloadsTotal: number;
  downloadsToday: number;
  acumulatedSizeTotal: number;
  acumulatedSizeDay: number;
  activeAccount: isActive
}

export type InactiveAccountValues = {
  consecutiveDownloads: number;
  activeAccount: isActive;
}

export type isActive = 'yes' | 'no'