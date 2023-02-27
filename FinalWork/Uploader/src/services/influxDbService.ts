import { InfluxDB, WriteApi } from "@influxdata/influxdb-client";
import { hostname } from "os";

const url = 'http://localhost:8086/';
const token = 'v1-YenHtnBPiYxgQTbP_5uKMHISEbToztx4M2tXLx1SIgmJpZkC0WcVljTy6eI0j6S1IsBHYzkO-mjBGz8wwwQ==';
const org = 'haap';
const bucket = 'Reports';

export default class InfluxDbService {
    private influxDB: InfluxDB;
    private writeApi: WriteApi;

    private url: string;
    private token: string;
    private org: string;
    private bucket: string;

    constructor() {
        this.url = url;
        this.token = token;
        this.org = org;
        this.bucket = bucket;
        this.writeApi = new InfluxDB({ url, token })
        .getWriteApi(org, bucket, 'ns')
        .useDefaultTags({ location: hostname() })
    }
}