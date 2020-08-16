const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const home = require("os").homedir();
const path = require("path");
const url = require("url");
const http = require('http');
const fileManager = require('fs');
const {autoUpdater} = require("electron-updater");


let mainWindow;
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
	
	// splash = new BrowserWindow({width: 810, height: 610, transparent: false, frame : false});
	// splash.setAlwaysOnTop(true, 'screen');
	// splash.show();
	// splash.loadURL('http://localhost:8000/');
	mainWindow.loadFile(__dirname + '/src/index.html');

	mainWindow.webContents.on('did-finish-load', function() {
		// splash.destroy();
		mainWindow.webContents.send('version', app.getVersion());
		// mainWindow.maximize();
		mainWindow.show();
		autoUpdater.checkForUpdatesAndNotify();
	});
	
}