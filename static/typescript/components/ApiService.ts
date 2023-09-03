import { SensorData } from "./SensorData";

export class ApiService{
    constructor(){}
    
    async PostDatesForTempHumData(datesAsString: String[]): Promise<SensorData[]>{
        const response: Response = await fetch(`/view-temp-and-humidity-data`,
            {
                'method': 'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(datesAsString)
            }
        )
        const jsonDataArray: any = await response.json()
        return jsonDataArray.map(
            (responseAsJson: string) => new SensorData(JSON.parse(responseAsJson))
        )
    }  
}