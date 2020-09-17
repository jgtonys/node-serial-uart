<script>

  //Importing Bar class from the vue-chartjs wrapper
  import { Bar } from 'vue-chartjs'
  //Exporting this so it can be used in other components
  export default {
    extends: Bar,
    data () {
      return {
        datacollection: {
          //Data to be represented on x-axis
          labels: ['PGW1', 'PGW2', 'PGW3', 'PGW4', 'PGW5', 'PGW6', 'PGW7', 'PGW8', 'PGW9', 'PGW10', 'PGW11', 'PGW12'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: [40, 40, 40, 40, 40, 10, 40, 40, 40, 40, 40, 40]
            }
          ]
        },
        //Chart.js options that controls the appearance of the chart
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false,
          onClick:this.handle
        }
      }
    },
    methods: {
      drawChart(){
        console.log(this)
        console.log(this.datacollection.datasets[0].data)
      },
    },
    mounted () {
    console.log(this.$parent.$parent.$parent.$scriptTest)
      //renderChart function renders the chart with the datacollection and options object.
      this.renderChart(this.datacollection, this.options)
    }
  }


</script>
