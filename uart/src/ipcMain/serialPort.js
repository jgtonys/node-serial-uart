import { app, protocol, BrowserWindow, ipcMain } from 'electron'
var SerialPort = require('serialport');



async function readAvailablePorts() {
  const ports = await SerialPort.list();
  return ports;
}


ipcMain.on('ping', (event, data) => {

  event.sender.send('pong', Math.random())
})


ipcMain.on('test', function(event, arg){
  readAvailablePorts().then(function (deviceList) {
		console.log(deviceList);
		event.sender.send('resDevice', deviceList)
	})
});
