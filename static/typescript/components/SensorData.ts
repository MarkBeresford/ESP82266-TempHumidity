export class SensorData {
    sample_time: number
    temperature: number
    humidity: number

    constructor(
        jsonData: {sample_time: string, temperature: string, humidity: string}
    ) {
        this.sample_time = parseInt(jsonData.sample_time);
        this.temperature = parseInt(jsonData.temperature);
        this.humidity = parseInt(jsonData.humidity);
    }
  }