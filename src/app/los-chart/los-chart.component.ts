import { Component, OnInit } from '@angular/core';
import { dataBE } from '../data';
import { ProjectDetails } from '../project-details-data';

export class AlgologsResponseModel {
  at: string;
  grp: number;
  spdPost: number;
}


@Component({
  selector: 'app-los-chart',
  templateUrl: './los-chart.component.html',
  styleUrls: ['./los-chart.component.scss']
})
export class LosChartComponent implements OnInit {

  projectData = dataBE;
  deviceData = ProjectDetails;
  groups: any;
  rules: any;
  projectRules: any;

  ngOnInit(): void {
    this.setupProjectDetails(this.deviceData);
    this.generateLosChartData(this.projectData)
  }

  setupProjectDetails(deviceData) {
    let groupNo = 1;
    this.groups = deviceData[0].devices
      .filter((d) => d.coreType === 'radar')
      .map(() => groupNo++);

    this.rules = deviceData[0].projectRules ? [...deviceData[0].projectRules] : [];
    const newRules = [];
    this.groups.forEach((g) => {
      const speeds = [];
      this.rules
        .filter((r) => r.group === g)
        .forEach((r) => {
          speeds.push('[' + r.speedAtLeast + '-' + r.speedLessThan + ']');
        });
      newRules.push(speeds.join(' '));
    });
    this.projectRules = [...newRules];
  }

  private generateLosChartData(data: AlgologsResponseModel[]) {
    // let lastState = -2000;
    this.groups.forEach((g) => {
      const labels = data
        .filter((i) => i.grp === g)
        .map((i) => i.at)
        .filter(
          (item, index, array) => array.findIndex((ai) => ai === item) === index
        );

      const groupRules = this.rules
        .filter((r) => r.group === g)
        .sort((a, b) => (a.priority > b.priority ? -1 : 1));
      const stau = groupRules[0]?.priority;
      const staugefahr = groupRules[1]?.priority;
      const neutral = groupRules[2]?.priority;

      const neutralData = [];
      const staugefahrData = [];
      const stauData = [];

      const grpData = data
        .filter((d) => d.grp === g)
        .map<{ at: string; grp: number; spdPost: number; prio: number }>(
          (i) => {
            const rule =
              i.spdPost === null || isNaN(i.spdPost)
                ? -1000
                : groupRules
                    .filter(
                      (r) =>
                        i.spdPost < r.speedLessThan &&
                        i.spdPost >= r.speedAtLeast
                    )
                    .map((r) => r.priority)[0] ?? -1000;
            return {
              at: i.at,
              grp: i.grp,
              spdPost: i.spdPost,
              prio: rule,
            };
          }
        );

      for (let i = 0; i < grpData.length; i++) {
        const c = grpData[i];
        const n = i < grpData.length ? grpData[i + 1] : null;
        const p = i > 0 ? grpData[i - 1] : null;

        if (c.prio === -1000) {
          // unknown prio!
          neutralData.push({ x: c.at, y: NaN });
          staugefahrData.push({ x: c.at, y: NaN });
          stauData.push({ x: c.at, y: NaN });
        } else {
          // known prio
          if (i > 0 && i < grpData.length - 1) {
            // all except the very first and last point

            if (c.prio !== p.prio) {
              // current point differs from previous one
              // 0 1
              if (c.prio === neutral) {
                neutralData.push({ x: c.at, y: 0.5 });

                if (p.prio === staugefahr) {
                  staugefahrData.push({ x: c.at, y: 1.5 });
                  staugefahrData.push({ x: c.at, y: NaN });
                }
                if (p.prio === stau) {
                  stauData.push({ x: c.at, y: 2.5 });
                  stauData.push({ x: c.at, y: NaN });
                }
              }

              if (c.prio === staugefahr) {
                staugefahrData.push({ x: c.at, y: 1.5 });

                if (p.prio === neutral) {
                  neutralData.push({ x: c.at, y: 0.5 });
                  neutralData.push({ x: c.at, y: NaN });
                }
                if (p.prio === stau) {
                  stauData.push({ x: c.at, y: 2.5 });
                  stauData.push({ x: c.at, y: NaN });
                }
              }

              if (c.prio === stau) {
                stauData.push({ x: c.at, y: 2.5 });

                if (p.prio === neutral) {
                  neutralData.push({ x: c.at, y: 0.5 });
                  neutralData.push({ x: c.at, y: NaN });
                }
                if (p.prio === staugefahr) {
                  staugefahrData.push({ x: c.at, y: 1.5 });
                  staugefahrData.push({ x: c.at, y: NaN });
                }
              }
            }
          } else {
            // very fist and last datapoint
            neutralData.push({ x: c.at, y: c.prio === neutral ? 0.5 : NaN });
            staugefahrData.push({
              x: c.at,
              y: c.prio === staugefahr ? 1.5 : NaN,
            });
            stauData.push({ x: c.at, y: c.prio === stau ? 2.5 : NaN });
          }
        }
      }
      console.log(labels, neutralData, staugefahrData);

      // this.losChartData = {
      //   labels: [...labels],
      //   datasets: [
      //     {
      //       label: 'LOS0',
      //       borderColor: '#12CC3330',
      //       backgroundColor: '#12CC3330',
      //       data: [...neutralData],
      //     },
      //     {
      //       label: 'LOS1',
      //       borderColor: '#F6D70050',
      //       backgroundColor: '#F6D70050',
      //       data: [...staugefahrData],
      //     },
      //     {
      //       label: 'LOS2',
      //       borderColor: '#EA000040',
      //       backgroundColor: '#EA000040',
      //       data: [...stauData],
      //     },
      //   ],
      // };
    });
  }

}
