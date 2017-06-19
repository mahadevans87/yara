import { Record } from '../models/Record'

export class Session {
  public records: Array<Record>;

  constructor(name: string, startTimeStamp: Number, username: string) {
    this.records = new Array<Record>();
  }

  pushRecord(record: Record) {
    this.records.push(record);    
  }
  
}