export class ApiService{
    constructor(){}
    
    async PostDatesForTempHumData(body: any){
        return fetch(`/view-temp-and-humidity-data`,
        {
            'method': 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(jsonResponse => this.mapData(jsonResponse))
    }  

    mapData(response) {
        const jsonResponse = response
        .map(row => JSON.parse(row))
        .sort((a, b) => parseInt(b.sample_time) - parseInt(a.sample_time))
          return {
              labels: jsonResponse.map(row => new Date(parseInt(row.sample_time))),
              datasets: [
                  {
                      label: 'Temperature',
                      data: jsonResponse.map(row => row.temperature),
                      fill: false,
                      cubicInterpolationMode: 'monotone',
                      tension: 0.4,
                      yAxisID: 'y'
                  },
                  {
                      label: 'Humidity',
                      data: jsonResponse.map(row => row.humidity),
                      fill: false,
                      cubicInterpolationMode: 'monotone',
                      tension: 0.4,
                      yAxisID: 'y1',  
                  }
              ]
          }
      }
    }