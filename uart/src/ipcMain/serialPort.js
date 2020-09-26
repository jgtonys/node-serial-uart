import { app, protocol, BrowserWindow, ipcMain } from 'electron'
var SerialPort = require('serialport');

let port;



async function readAvailablePorts() {
  const ports = await SerialPort.list();
  return ports;
}


ipcMain.on('ping', (event, data) => {
  event.sender.send('pong', Math.random())
})


ipcMain.on('getDevice', function(event, arg){
  readAvailablePorts().then(function (deviceList) {
		console.log(deviceList);
		event.sender.send('resDevice', deviceList)
	})
});


ipcMain.on('sendTest', (event, data) => {
	port = new SerialPort(data.port, function (err) {
	  if (err) {
	    return console.log('Error: ', err.message)
	  }
	})
	port.open(function (error) {
      if (error) {
        return console.log('failed to open: ' + error);
    }
  event.sender.send('resTest', "received correctly");
})
