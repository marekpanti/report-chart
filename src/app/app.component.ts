import { Component } from '@angular/core';
import { dataBE } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
  ];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', pointRadius: 0 },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  ];
  dataFromBE = dataBE;
  transformedData: any = [
    {
      name: 1,
      series: [],
    },
  ];

  dataSet2 = [
    {
      name: 'Azerbaijan',
      series: [
        {
          value: 6000,
          name: '2016-09-22T11:36:25.354Z',
        },
        {
          value: 6000,
          name: '2016-09-20T13:40:45.440Z',
        },
        {
          value: 0,
          name: '2016-09-13T11:43:22.612Z',
        },
        {
          value: 0,
          name: '2016-09-13T22:40:29.279Z',
        },
        {
          value: 6000,
          name: '2016-09-16T03:56:58.553Z',
        },
      ],
    },
    {
      name: "Lao People's Democratic Republic",
      series: [
        {
          value: 0,
          name: '2016-09-22T11:36:25.354Z',
        },
        {
          value: 0,
          name: '2016-09-20T13:40:45.440Z',
        },
        {
          value: 4000,
          name: '2016-09-13T11:43:22.612Z',
        },
        {
          value: 0,
          name: '2016-09-13T22:40:29.279Z',
        },
        {
          value: 4000,
          name: '2016-09-16T03:56:58.553Z',
        },
      ],
    },
    {
      name: 'Portugal',
      series: [
        {
          value: 0,
          name: '2016-09-22T11:36:25.354Z',
        },
        {
          value: 0,
          name: '2016-09-20T13:40:45.440Z',
        },
        {
          value: 0,
          name: '2016-09-13T11:43:22.612Z',
        },
        {
          value: 3000,
          name: '2016-09-13T22:40:29.279Z',
        },
        {
          value: 0,
          name: '2016-09-16T03:56:58.553Z',
        },
      ],
    },
  ];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Hour';
  yAxisLabel: string = 'Km/h';
  timeline: boolean = true;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  transformedData2: any = [
    {
      name: 1,
      series: [],
    },
  ];

  ngOnInit() {

    // console.log(this.transformedData);
    this.transformMainData();
    this.transformLosData();
    // this.transformLosData2();
  }

  transformLosData2() {
    const items = this.dataFromBE;
    let rules: any = {
      a: {
        series: []
      },
      b: {
        series: []
      },
      c: {
        series: []
      }
    };
    let transformedData = [];

    for (let i = 0; i < this.dataFromBE.length; i++) {
      // console.log(items[i].spdPost);
      if (
        items[i].grp === 1 &&
        items[i].spdPost >= 75
      ) {
        // bigger than 75
        rules.a.series.push({
              name: new Date(this.dataFromBE[i].at), // x axis
              value: this.dataFromBE[i].spdPost, // y axis
        });
      } else if (
        items[i].grp === 1 &&
        items[i].spdPost < 75 &&
        items[i].spdPost > 35
      ) {
        rules.b.series.push({
              name: new Date(this.dataFromBE[i].at), // x axis
              value: this.dataFromBE[i].spdPost, // y axis
        });
      } else if (
        items[i].grp === 1 &&
        items[i].spdPost < 35
      ) {
        rules.c.series.push({
              name: new Date(this.dataFromBE[i].at), // x axis
              value: this.dataFromBE[i].spdPost, // y axis
        });
      }
    }

    for (const key in rules) {
      transformedData.push({
        name: key,
        series: [rules[key].series[0], rules[key].series[rules[key].series.length - 1]],
      });
    }
    console.log(transformedData);
    this.transformedData2 = transformedData;
  }


  transformLosData() {
    const items = this.dataFromBE;
    let rules: any = {
      a: {
        series: []
      },
      b: {
        series: []
      },
      c: {
        series: []
      }
    };
    let transformedData = [];

    for (let i = 0; i < this.dataFromBE.length; i++) {
      // console.log(items[i].spdPost);
      if (
        items[i].grp === 1 &&
        items[i].spdPost >= 75
      ) {
        // bigger than 75
        rules.a.series.push({
              name: new Date(this.dataFromBE[i].at), // x axis
              value: this.dataFromBE[i].spdPost, // y axis
        });
      } else if (
        items[i].grp === 1 &&
        items[i].spdPost < 75 &&
        items[i].spdPost > 35
      ) {
        rules.b.series.push({
              name: new Date(this.dataFromBE[i].at), // x axis
              value: this.dataFromBE[i].spdPost, // y axis
        });
      } else if (
        items[i].grp === 1 &&
        items[i].spdPost < 35
      ) {
        rules.c.series.push({
              name: new Date(this.dataFromBE[i].at), // x axis
              value: this.dataFromBE[i].spdPost, // y axis
        });
      }
    }

    for (const key in rules) {
      transformedData.push({
        name: key,
        series: rules[key].series,
      });
    }
    console.log(transformedData);
    this.transformedData2 = transformedData;
  }

  transformMainData() {
    const items = this.dataFromBE;
    let groups: any = {};
    let transformedData = [];

    for (let i = 0; i < this.dataFromBE.length; i++) {
      if (!groups[items[i].grp]) {
        groups[items[i].grp] = {
          series: [
            {
              name: new Date(this.dataFromBE[i].at), // x axis
              value: this.dataFromBE[i].spdPost, // y axis
            },
          ],
        };
      } else {
        groups[items[i].grp].series.push({
          name: new Date(this.dataFromBE[i].at), // x axis
          value: this.dataFromBE[i].spdPost, // y axis
        });
      }
    }

    for (const key in groups) {
      transformedData.push({
        name: key,
        series: groups[key].series,
      });
    }
    console.log(groups, transformedData);
    this.transformedData = transformedData;
  }
}
