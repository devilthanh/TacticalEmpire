const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const home = require("os").homedir();
const path = require("path");
const url = require("url");
const http = require('http');
const fileManager = require('fs');
const {autoUpdater} = require("electron-updater");


<<<<<<< HEAD
let mainWindow;
=======
let clientWindow, gameWindow;
var isLoaded = false;
>>>>>>> 8c74787efdfb9ad2b6f2384e39223d0a6593f2f0
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

<<<<<<< HEAD
	app.on('ready',createWindow);

	app.on('window-all-closed', ()=>{
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});

	app.on('active', ()=>{
		if(mainWindow===null){
			createWindow();
		}
	});
=======
app.on('ready',createClientWindow);

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
>>>>>>> 8c74787efdfb9ad2b6f2384e39223d0a6593f2f0
	
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
	
<<<<<<< HEAD
	autoUpdater.on('checking-for-update', () => {
		// mainWindow.webContents.send('output', 'stdout:' + 'Checking for update...\n');
	});

	autoUpdater.on('update-available', (info) => {
		// mainWindow.webContents.send('output', 'stdout:' + 'Update available.\n');
	});

	autoUpdater.on('update-not-available', (info) => {
		// mainWindow.webContents.send('output', 'stdout:' + 'Update not available.\n');
	});

	autoUpdater.on('error', (err) => {
		// mainWindow.webContents.send('output', 'stderr:' + 'Error in auto-updater. ' + err + '\n');
	});

	autoUpdater.on('download-progress', (progressObj) => {
		// let log_message = "Download speed: " + progressObj.bytesPerSecond
		// log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
		// log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
		// dispatch(log_message)

		// mainWindow.webContents.send('output', 'stdout:' + 'downloading: ' + Math.round(progressObj.percent*10)/10 + '%.\n');
	});

	autoUpdater.on('update-downloaded', (info) => {
		// mainWindow.webContents.send('output', 'Update downloaded.\n');
	})
// }

function createWindow(){
	app.allowRendererProcessReuse = true;
	mainWindow = new BrowserWindow({width: 1280, height: 720, show: false, webPreferences: {nodeIntegration: true}});

	//Menu.setApplicationMenu(null);
	
	//mainWindow.webContents.on("devtools-opened", () => { mainWindow.webContents.closeDevTools(); });
	mainWindow.on('closed', ()=>{
		mainWindow = null;
	})
=======
autoUpdater.on('checking-for-update', () => {
	clientWindow.webContents.send('status', 'Checking for update...');
});

autoUpdater.on('update-available', (info) => {
	clientWindow.webContents.send('status', 'Update found...');
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
	// mainWindow.webContents.send('output', 'Update downloaded.\n');
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
	clientWindow.destroy();
	//Menu.setApplicationMenu(null);
	
	//gameWindow.webContents.on("devtools-opened", () => { gameWindow.webContents.closeDevTools(); });
	gameWindow.on('closed', ()=>{
		gameWindow = null;
	});
>>>>>>> 8c74787efdfb9ad2b6f2384e39223d0a6593f2f0
	
	// splash = new BrowserWindow({width: 810, height: 610, transparent: false, frame : false});
	// splash.setAlwaysOnTop(true, 'screen');
	// splash.show();
	// splash.loadURL('http://localhost:8000/');
<<<<<<< HEAD
	mainWindow.loadFile(__dirname + '/src/index.html');

	mainWindow.webContents.on('did-finish-load', function() {
		// splash.destroy();
		mainWindow.webContents.send('version', app.getVersion());
		// mainWindow.maximize();
		mainWindow.show();
=======
	gameWindow.loadFile(__dirname + '/src/index.html');

	gameWindow.webContents.on('did-finish-load', function() {
		gameWindow.webContents.send('version', app.getVersion());
		gameWindow.show();
>>>>>>> 8c74787efdfb9ad2b6f2384e39223d0a6593f2f0
		autoUpdater.checkForUpdatesAndNotify();
	});
	
}