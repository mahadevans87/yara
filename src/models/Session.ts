import { Record } from '../models/Record'

export class Session {
  public records: Array<Record>;

  constructor(public name: string, public  startTimeStamp: number, public  username: string) {
    this.records = new Array<Record>();
  }

  pushRecord(record: Record) {
    this.records.push(record);    
  }
  
}