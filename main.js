const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const home = require("os").homedir();
const path = require("path");
const url = require("url");
const http = require('http');
const fileManager = require('fs');
const {autoUpdater} = require("electron-updater");

const DEBUG = true;

let clientWindow, gameWindow;
var isLoaded = false;

// const gotTheLock = app.requestSingleInstanceLock();

// if (!gotTheLock) {
	// app.quit();
// }else {
	// app.on('second-instance', (event, commandLine, workingDirectory) => {
		// if (mainWindow) {
			// if (mainWindow.isMinimized()) mainWindow.restore();
			// mainWindow.focus();
		// }
	// })

if(DEBUG){
	isLoaded = true;
	app.on('ready', createGameWindow);
}else app.on('ready', createClientWindow);

app.on('window-all-closed', ()=>{
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('active', ()=>{
	if(isLoaded){
		if(gameWindow===null){
			createGameWindow();
		}
	}else{
		if(clientWindow===null){
			createClientWindow();
		}
	}

});
	
	// ipcMain.on('code', (event, code) => {
	// 	var fileDir = home + '/Documents/MakerBlockly/upload_sketch';
	// 	fileManager.mkdirSync(fileDir, {recursive: true});
	// 	fileManager.writeFile(fileDir + '/upload_sketch.ino', code, { recursive: true }, function (err) {
	// 		if (err) throw err;
	// 	}); 
	// 	uploadSketch('arduino:avr:uno', 'COM4', fileDir);
	// });
	
	// ipcMain.on('getSerialPorts', (event, code) => {
	// 	getSerialPorts();
	// });
	
autoUpdater.on('checking-for-update', () => {
	clientWindow.webContents.send('status', 'Checking for update...');
});

autoUpdater.on('update-available', (info) => {
	clientWindow.webContents.send('status', 'Update found v.' + info.version + '\nGetting to download...');
	clientWindow.webContents.send('info', info.toS);
});

autoUpdater.on('update-not-available', (info) => {
	isLoaded = true;
	createGameWindow();
});

autoUpdater.on('error', (err) => {
	clientWindow.webContents.send('status', 'Error in auto-updater. ' + err);
});

autoUpdater.on('download-progress', (progressObj) => {
	// let log_message = "Download speed: " + progressObj.bytesPerSecond
	// log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
	// log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
	// dispatch(log_message)
	var speed = progressObj.bytesPerSecond;
	clientWindow.webContents.send('status', 'Downloading... ' + Math.round(progressObj.percent*10)/10 + '%  (' + speed + ' bytes/second)');
});

autoUpdater.on('update-downloaded', (info) => {
	autoUpdater.quitAndInstall();
})
// }

function createClientWindow(){
	Menu.setApplicationMenu(null);
	app.allowRendererProcessReuse = true;
	clientWindow = new BrowserWindow({width: 300, height: 50, frame: false, show: false, webPreferences: {nodeIntegration: true}});

	clientWindow.on('closed', ()=>{
		clientWindow = null;
	});

	clientWindow.loadFile(__dirname + '/src/client.html');

	clientWindow.webContents.on('did-finish-load', function() {
		clientWindow.webContents.send('version', app.getVersion());
		clientWindow.show();
		autoUpdater.checkForUpdatesAndNotify();
	});
}

function createGameWindow(){
	app.allowRendererProcessReuse = true;
	gameWindow = new BrowserWindow({width: 1280, height: 720, show: false, webPreferences: {nodeIntegration: true}});
	
	if(!DEBUG) clientWindow.destroy();
	//Menu.setApplicationMenu(null);
	
	//gameWindow.webContents.on("devtools-opened", () => { gameWindow.webContents.closeDevTools(); });
	gameWindow.on('closed', ()=>{
		gameWindow = null;
	});
	
	// splash = new BrowserWindow({width: 810, height: 610, transparent: false, frame : false});
	// splash.setAlwaysOnTop(true, 'screen');
	// splash.show();
	// splash.loadURL('http://localhost:8000/');
	gameWindow.loadFile(__dirname + '/src/index.html');

	gameWindow.webContents.on('did-finish-load', function() {
		gameWindow.webContents.send('version', app.getVersion());
		gameWindow.show();
		autoUpdater.checkForUpdatesAndNotify();
	});
	
}