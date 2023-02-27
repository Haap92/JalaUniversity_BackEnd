import DriveAccountService from "./driveAccountService"
import FileReportService from "./fileReportService"
import logger from "jet-logger";

const cron = require('node-cron')

export default class DailyUpdateService {
    private fileReportService: FileReportService
    private driveAccountService: DriveAccountService
  
    constructor () {
      this.fileReportService = new FileReportService()
      this.driveAccountService = new DriveAccountService()
    }
  
    setScheduleUpdate () {
      cron.schedule('00 01 * * *', () => {
        this.fileReportService.dailyUpdateDownloads()
        this.driveAccountService.dailyUpdateDownloads()
        logger.info('Day have been resetted');
      }, {
        scheduled: true,
        timezone: 'America/Buenos_Aires'
      })
    }
  }