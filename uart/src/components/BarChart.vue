<script>

  var values= [
      {
      name: "MME1",
      value: [20, 20, 30, 50, 90, 10, 20, 40, 50, 70, 90, 100]
      },
      {
      name: "MME2",
      value: [30, 40, 44, 50, 90, 10, 20, 40, 50, 70, 90, 100]
      },
      {
      name: "MME3",
      value: [40, 20, 30, 50, 90, 10, 20, 40, 50, 70, 90, 100]
      }
    ]

  var backendData = {}
  //Importing Bar class from the vue-chartjs wrapper
  import { Bar } from 'vue-chartjs'
  import axios from 'axios'
  //Exporting this so it can be used in other components
  export default {
    extends: Bar,

    data () {
      return {
      datacollection: {
        //Data to be represented on x-axis
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'CAPA',
            backgroundColor: 'rgba(103, 153, 255, 0.5)',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            //Data to be represented on y-axis
            data: values[0].value
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
      handle (point, event) {
        const item = event[0]
        //console.log(item)
        //console.log(this.datacollection)
        //this.datacollection.datasets[0].backgroundColor = this.gradient
        //this.renderChart(this.datacollection, this.options)
        if(item._index != undefined) {
          //this.$parent.openModal()
          console.log(item._index)
          //console.log(this.$parent.$parent)
          //this.$parent.drawChart(values[0].value)
          this.$parent.$parent.showModal(values[0].value)
        }
      },
      refresh() {
        axios.get("http://localhost:8080/api/mme")
        .then((result) => {
          console.log(result)
          backendData = result.data
          console.log(backendData)
        })
      }
    },
    mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(103, 153, 255, 0.7)')
    this.gradient.addColorStop(0.5, 'rgba(61, 183, 204, 0.5)')
    this.gradient.addColorStop(1, 'rgba(0, 0, 255, 0)')
      //renderChart function renders the chart with the datacollection and options object.
      this.renderChart(this.datacollection, this.options)
    },
    created() {
      this.datacollection.labels = ['PGW1','PGW2','PGW3','PGW4','PGW5','PGW6','PGW7','PGW8','PGW9','PGW10','PGW11','PGW12'];
      this.interval = setInterval(()=> this.refresh(),10000);
    }
  }


</script>
