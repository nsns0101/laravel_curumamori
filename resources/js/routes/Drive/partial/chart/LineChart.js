import React, {useContext} from "react";
import {AppContext} from "../../../../components/App";
import { DriveContext } from "../../DriveContainer";
import {Line} from "react-chartjs-2";

export default () => {
  const { t } = useContext(AppContext);

    const {
        day_5,
        day_5_danger_count
    } = useContext(DriveContext);

    //숫자 포맷
    const number_format = (number, decimals, dec_point, thousands_sep) => {
        // *     example: number_format(1234.56, 2, ',', ' ');
        // *     return: '1 234,56'
        number = (number + '').replace(',', '').replace(' ', '');
        var n = !isFinite(+number) ? 0 : +number,
          prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
          sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
          dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
          s = '',
          toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
          };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
          s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
          s[1] = s[1] || '';
          s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
      }

      //라인차트 값
      const LineChart = {
        data: {
            //day_5배열은 drive_score.blade.php의 script참고
            labels: [day_5[4], day_5[3],day_5[2], day_5[1], day_5[0]], //항목
            datasets: [{
              type: 'line',       //차트 형태
              label: t("급 가속"),
              lineTension: 0.3,
              backgroundColor: "rgba(78, 115, 223, 0.05)",
              borderColor: "orange",   //선 색깔
              pointRadius: 3,
              pointBackgroundColor: "orange",  //꼭짓점 색깔
              pointBorderColor: "orange",  //꼭짓점 바탕색깔
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
              pointHoverBorderColor: "rgba(78, 115, 223, 1)",
              pointHitRadius: 10,
              pointBorderWidth: 2,
              //값
              data: [
                day_5_danger_count[4].count_sudden_acceleration, 
                day_5_danger_count[3].count_sudden_acceleration,
                day_5_danger_count[2].count_sudden_acceleration, 
                day_5_danger_count[1].count_sudden_acceleration, 
                day_5_danger_count[0].count_sudden_acceleration
              ],
            },
            {
              type: 'line',
              label: t("급 감속"),
              lineTension: 0.3,
              backgroundColor: "rgba(78, 115, 223, 0.05)",
              borderColor: "green",
              pointRadius: 3,
              pointBackgroundColor: "green",
              pointBorderColor: "green",
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
              pointHoverBorderColor: "rgba(78, 115, 223, 1)",
              pointHitRadius: 10,
              pointBorderWidth: 2,
              //값
              data: [
                day_5_danger_count[4].count_sudden_stop, 
                day_5_danger_count[3].count_sudden_stop,
                day_5_danger_count[2].count_sudden_stop, 
                day_5_danger_count[1].count_sudden_stop, 
                day_5_danger_count[0].count_sudden_stop 
              ],
            },
            {
              type: 'line',
              label: t("졸음"),
              lineTension: 0.3,
              backgroundColor: "rgba(78, 115, 223, 0.05)",
              borderColor: "rgba(78, 115, 223, 1)",
              pointRadius: 3,
              pointBackgroundColor: "rgba(78, 115, 223, 1)",
              pointBorderColor: "rgba(78, 115, 223, 1)",
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
              pointHoverBorderColor: "rgba(78, 115, 223, 1)",
              pointHitRadius: 10,
              pointBorderWidth: 2,
              //값
              data: [
                day_5_danger_count[4].count_sleep, 
                day_5_danger_count[3].count_sleep,
                day_5_danger_count[2].count_sleep, 
                day_5_danger_count[1].count_sleep, 
                day_5_danger_count[0].count_sleep 
              ],
            },
            {
              type: 'line',
              label: t("신고"),
              lineTension: 0.3,
              backgroundColor: "rgba(78, 115, 223, 0.05)",
              borderColor: "red",   //선 색깔
              pointRadius: 3,
              pointBackgroundColor: "red",  //꼭짓점 색깔
              pointBorderColor: "red",  //꼭짓점 바탕색깔
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
              pointHoverBorderColor: "rgba(78, 115, 223, 1)",
              pointHitRadius: 10,
              pointBorderWidth: 2,
              //값
              data: [
                day_5_danger_count[4].count_report, 
                day_5_danger_count[3].count_report,
                day_5_danger_count[2].count_report, 
                day_5_danger_count[1].count_report, 
                day_5_danger_count[0].count_report 
              ],
            },
          ],
          },
          options: {
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: 10,
                right: 25,
                top: 25,
                bottom: 0
              }
            },
            scales: {
              xAxes: [{
                time: {
                  unit: 'date'
                },
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  maxTicksLimit: 7
                }
              }],
              yAxes: [{
                ticks: {
                  maxTicksLimit: 5,
                  padding: 10,
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                    // return '$' + number_format(value);
                    return number_format(value) + "회";
                  }
                },
                gridLines: {
                  color: "rgb(234, 236, 244)",
                  zeroLineColor: "rgb(234, 236, 244)",
                  drawBorder: false,
                  borderDash: [2],
                  zeroLineBorderDash: [2]
                }
              }],
            },
            //범례
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                  fontColor: '#333',
                  fontSize:15,
              }
            },
            tooltips: { //선 눌렀을 때 나오는 창
              backgroundColor: "white", //백그라운드 컬러
              bodyFontColor: "black", //폰트 색깔
              bodyFontSize: 20, //폰트 크기
              titleMarginBottom: 10,
              titleFontColor: '#6e707e',
              titleFontSize: 14,
              borderColor: 'blue',
              borderWidth: 1,
              xPadding: 15,
              yPadding: 15,
              displayColors: false,
              intersect: false,
              mode: 'index',
              caretPadding: 10,
              callbacks: {
                label: function(tooltipItem, chart) {
                  var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                  return datasetLabel + number_format(tooltipItem.yLabel) + t('회');
                }
              }
            }
          }
    }
    const datasetKeyProvider = Math.random();

    return(
        <Line data={LineChart.data} options={LineChart.options} width={693} height={320} key={datasetKeyProvider}/>
    )
}