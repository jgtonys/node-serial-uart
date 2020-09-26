<template>
  <div id="app">
    <div>

    </div>
    <div>
      <v-row>
        <v-col class="d-flex" cols="12" sm="2">
          <v-file-input
            v-model="files"
            color="deep-purple accent-4"
            counter
            label="File input"
            @change="excelExport($event)"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            placeholder="Select your files"
            prepend-icon="mdi-paperclip"
            outlined
            :show-size="1000"
          >
            <template v-slot:selection="{ index, text }">
              <v-chip
                v-if="index < 2"
                color="deep-purple accent-4"
                dark
                label
                small
              >
                {{ text }}
              </v-chip>
            </template>
          </v-file-input>

        </v-col>
        <v-col class="d-flex" cols="12" sm="2">
          {{ selection }}
        </v-col>
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            :items="selection"
            label="Solo field"
            solo
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            :items="selection"
            label="Solo field"
            solo
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            :items="selection"
            label="Solo field"
            solo
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="2">
          <v-btn
            :loading="loading"
            :disabled="loading || !isFileExist"
            @click="test()"
          >
            Start
          </v-btn>
        </v-col>

      </v-row>
      <v-simple-table fixed-header height="" dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Order</th>
              <th class="text-left">Command</th>
              <th class="text-left">COM</th>
              <th class="text-left">Gpio</th>
              <th class="text-left">Wait Time</th>
              <th class="text-left">Check Response</th>
              <th class="text-left">Response Success</th>
              <th class="text-left">Delay</th>
              <th class="text-left">Retry</th>
              <th class="text-left">Count enable</th>
              <th class="text-left">Count string</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,idx) in excelData" :key="idx">
              <td>{{ idx }} </td>
              <td>{{ item["Command"] }}</td>
              <td>{{ item["COM"] }}</td>
              <td>{{ item["Gpio"] }}</td>
              <td>{{ item["Wait Time"] }}</td>
              <td>{{ item["Check Response"] }}</td>
              <td>{{ item["Response Success"] }}</td>
              <td>{{ item["Delay"] }}</td>
              <td>{{ item["Retry"] }}</td>
              <td>{{ item["Count enable"] }}</td>
              <td>{{ item["Count string"] }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx';
import { ipcRenderer } from 'electron';
//const ipcRenderer = require('electron').ipcRenderer;





export default {
  data() {
    return {
      excelData: [],
      files: [],
      isFileExist: false,
      loader: null,
      loading: false,
      selection: [1,2]
    };
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },
  mounted () {
    ipcRenderer.send('getDevice');

    ipcRenderer.on('resDevice', (event, args) => {
      console.log(args);
      this.selection = args;
    });
  },
  methods: {
    excelExport(event) {
      if(!this.files) {
        this.excelData = [];
        this.isFileExist = false;
        return;
      }
      var input = event;
      var reader = new FileReader();
      reader.onload = () => {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type : 'binary'});
        wb.SheetNames.forEach((sheetName) => {
          var rowObj =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
          this.excelData = rowObj;
          this.isFileExist = true;
        })
      };
      reader.readAsBinaryString(input);
    },
    test() {
      //let msg = 'Hello world';
      ipcRenderer.send('sendTest', {
        port: ""
      });

    }
  }
};
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
