import { drive_v3, google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import path from "path";
import GoogleDriveAccount from "../db/entities/googleDriveAccount";
import File from "../db/entities/File";
import { HttpError } from "../middlewares/errorHandler";
import stream from "stream";
const fs = require("fs");

export default class GoogleDriveService {
  protected oauth2Client: OAuth2Client;
  protected drive: drive_v3.Drive;

  constructor(googleDriveAccount: GoogleDriveAccount) {
    this.oauth2Client = new google.auth.OAuth2(
      googleDriveAccount.clientID,
      googleDriveAccount.clientSecret,
      googleDriveAccount.redirectUri
    );

    this.oauth2Client.setCredentials({
      refresh_token: googleDriveAccount.refreshToken,
    });

    this.drive = google.drive({
      version: "v3",
      auth: this.oauth2Client,
    });
  }

  async uploadFileToDrive(file: File, buffer: Buffer) {
    try {
      const bufferString = new stream.PassThrough();
      bufferString.end(buffer)
      const response = await this.drive.files.create({
        requestBody: {
          name: file.filename,
          mimeType: file.mimetype,
        },
        media: {
          mimeType: file.mimetype,
          body: bufferString
        },
      });
      return response.data;
    } catch (error) {
      throw new HttpError(404, "Failed to Upload the file to drive");
    }
  }

  async deleteFileFromDrive(fileId: string) {   
    try {
      const response = await this.drive.files.delete({
        fileId: fileId,
      });    
      return response.data, response.status;
    } catch (error) {
      throw new HttpError(404, "Failed to Delete the file from the drive");
    }
  }

  async generateDriveFilePublicUrl(fileId: string) {
    try {
      await this.drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      const result = await this.drive.files.get({
        fileId: fileId,
        fields: "webViewLink, webContentLink",
      });
      return result.data;
    } catch (error) {
      throw new HttpError(404, "Failed to Generate the download link");
    }
  }
}
