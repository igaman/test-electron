const { app, BrowserWindow } = require('electron');
const exec = require('child_process').exec;

function execute(command, callback) {
  exec(command, (error, stdout, stderr) => {
      callback(stdout);
  });
};

function createWindow () {
  execute('./node_modules/.bin/cypress open', (output) => {
    console.log(output);
  })
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
