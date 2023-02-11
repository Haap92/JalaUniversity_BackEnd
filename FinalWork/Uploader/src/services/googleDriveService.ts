import { drive_v3, google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import path from "path";
import GoogleDriveAccount from "../db/entities/googleDriveAccount";
import File from "../db/entities/File";
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

  async uploadFileToDrive(file: File) {
    try {
      const filePath = path.join(__dirname, "..", "..", `uploads/${file.name}`);
      const response = await this.drive.files.create({
        requestBody: {
          name: file.name,
          mimeType: file.mimetype,
        },
        media: {
          mimeType: file.mimetype,
          body: fs.createReadStream(filePath),
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async deleteFileFromDrive(fileId: string) {
    try {
      const response = await this.drive.files.delete({
        fileId: fileId,
      });
      console.log(response.data, response.status);
      return response.data, response.status;
    } catch (error) {
      console.log(error.message);
      throw error;
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
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}
