export class Record {
  constructor(public timestamp: number,
    public latitude: number,
    public longitude: number,
    public distanceFromStart: number,
    public currentSpeed: number,
    public averageSpeed: number) {

  }
}