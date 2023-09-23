import { AfterViewInit, Component,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  public dataSource:any= {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#FF00F4',
                '#FF9E00',
                '#C3A068',
                '#A7C368',
                '#68C393',
                '#00D8FF',
                '#AE00FF',
              ]
        }
    ],
    labels: []
};


  constructor(public http: HttpClient) {
    const el = document.getElementById('mychart');
    console.log('Is my chart there?', el);
  }

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i=0;i<res.myBudget.length; i++){
          this.dataSource.datasets[0].data[i]=res.myBudget[i].budget;
          this.dataSource.labels[i]=res.myBudget[i].title;

      }
      this.createChart()
  });
  }

  createChart() {
    // var ctx = document.getElementById("mychart").getContext("2d");
    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    var myPiechart = new Chart (ctx, {
      type :'pie',
      data : this.dataSource



    });
}

}


