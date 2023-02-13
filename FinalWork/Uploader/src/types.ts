export type GoogleDriveAccountValues = {
  email: string;
  clientID: string;
  clientSecret: string;
  redirectUri: string;
  refreshToken: string;
};

export type FileValues = {
  filename: string;
  originalname: string;
  size: number;
  mimetype: string;
  driveId?: string;
  status: status;
};

export type DownloadFileValues = {
  [x: string]: any;
  uploaderId: string;
  driveId: string;
  webViewLink: string;
  webContentLink: string;
  size: number;
  accountIndex: number;
};


export type status = 'Pending' | 'Replicating' | 'Uploaded'