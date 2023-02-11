export type GoogleDriveAccountValues = {
  email: string;
  clientID: string;
  clientSecret: string;
  redirectUri: string;
  refreshToken: string;
};

export type FileValues = {
  name: string;
  formerName: string;
  size: number;
  mimetype: string;
  driveId?: string;
  status: status;
};

export type status = 'Pending' | 'Replicating' | 'Uploaded'