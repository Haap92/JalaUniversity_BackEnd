const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '350951275573-pt08gi6mt4ld5hakl8cd43ln4qv9almf.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04l9iqAaxEf_BCgYIARAAGAQSNwF-L9Ir9m0c73gc3x3HoBVqlAh_LQXiR2fxIlXeUmp9ADyjiMnxjqZAVSRPbqi7dSHq-Oy3oms';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
})

const filePath = path.join(__dirname, 'TS.png')

async function  uploadFile() {
    try{
        const response = await drive.files.create({
            requestBody: {
                name: 'image.png',
                mimeType:'image/png'
            },
            media: {
                mimeType: 'image/png',
                body: fs.createReadStream(filePath)
            }
        });
        console.log(response.data);
    }catch (error) {
        console.log(error.message);
    }
}

// uploadFile();


async function deleteFile() {
    try{
        const response = await drive.files.delete({
            fileId: '1tCMLQKBJH2UZxbd0YnpPjkLnsBSqx5e6'
        });
        console.log(response.data, response.status);
    }catch (error) {
        console.log(error.message); 
    }
}

// deleteFile();

async function generatePublicUrl() {
    try{
        const fileId = '1A15N0vvIT_elCKDepUO0FVVCS-3VUgKS'
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });

        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink'
        });
        console.log(result.data);        
    }catch (error) {
        console.log(error.message);
    }
    
}

generatePublicUrl();