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


ipcMain.on('openTest', (event, data) => {
	port = new SerialPort(data.port, function (err) {
	  if (err) {
	    return console.log('Error: ', err.message)
	  }
	});
  port.on('open',function() {
    port.write(data.msg,function(err) {
      if (err) {
        return console.log('Error on write: ', err.message);
      }
      console.log(data.msg + " written");
    });
  });
  event.sender.send('resTest', "received correctly");
});


ipcMain.on('sendTest', (event, data) => {
  port.on('open',function() {
    port.write(data.msg,function(err) {
      if (err) {
        return console.log('Error on write: ', err.message);
      }
      console.log(data.msg + " written");
    });
  });
});
