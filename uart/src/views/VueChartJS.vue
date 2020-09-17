var test ="test"

<template>
  <section class="container">
  <v-app>
    <h1>explain here blablablabla</h1>

    <div class="example-modal-window" >

       <!-- 컴포넌트 MyModal -->
       <MyModal @close="closeModal" v-if="modal">
         <!-- default 슬롯 콘텐츠 -->
         <p>{{mytestdata}}</p>
         <popup-bar-chart></popup-bar-chart>
         <canvas id="MiniBar"></canvas>
         <div><input v-model="message"></div>
         <!-- /default -->
         <!-- footer 슬롯 콘텐츠 -->
         <template slot="footer">

         </template>
         <!-- /footer -->
       </MyModal>
     </div>


    <div class="columns">

      <div class="column">
        <h3>Chart Description here</h3>
        <bar-chart></bar-chart>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <h3>Bubble Chart</h3>
        <bubble-chart></bubble-chart>
      </div>
      <div class="column">
        <h3>Line Chart</h3>
        <line-chart></line-chart>
      </div>
    </div>


      <div>
        <v-alert dense dismissible type="success">
          I'm a success alert.
        </v-alert>

        <v-alert dense dismissible type="info">
          I'm an info alert.
        </v-alert>

        <v-alert dense dismissible type="warning">
          I'm a warning alert.
        </v-alert>

        <v-alert dense dismissible type="error">
          I'm an error alert.
        </v-alert>
      </div>
  </v-app>
  </section>

</template>

<script>

  import LineChart from '@/components/LineChart.vue'
  import BarChart from '@/components/BarChart.vue'
  import BubbleChart from '@/components/BubbleChart.vue'
  import MyModal from '@/components/MyModal.vue'
  import PopupBarChart from '@/components/PopupBarChart.vue'

  export default {
    name: 'VueChartJS',
    components: {
      LineChart,
      BarChart,
      BubbleChart,
      MyModal,
      PopupBarChart
    },
    data() {
      return {
        modal: false,
        message: '',
        mytestdata: ''
      }
    },
    methods: {

      showModal(data) {
        this.mytestdata = data
        this.modal=true

      },
      openModal() {
        this.modal = true
      },
      closeModal() {
        this.modal = false
      }
    }
  }


</script>
