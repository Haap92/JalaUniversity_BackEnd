import UploadedFile from "../entities/uploadedFile"

export interface UploadedFileRepository {

    create: (uploadedFile: UploadedFile) => Promise<UploadedFile>
    read: (id: string) => Promise<UploadedFile>
    update:(uploadedFile: UploadedFile) => Promise<void | Error>
    delete:(id: string) => Promise<string | Error>

}