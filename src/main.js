/**
* Import modules
*/
import { BrowserWindow, Menu, app } from 'electron';
import path from 'path';
import url from 'url';


/**
* Enable Widevine Content Decryption Module
*/
app.commandLine.appendSwitch('widevine-cdm-path', path.join(__dirname, 'lib/widewine-cdm/1.4.8.903/widevinecdmadapter.plugin'));
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.903');


/**
* Define global variable for the main window
*/
let mainWindow;


/**
* Create app menu template
*/
const menuTemplate = [{
  label: 'Netflix',
  submenu: [{
    label: 'About Netflix',
    role: 'about',
  }, {
    type: 'separator',
  }, {
    label: 'Hide Netflix',
    accelerator: 'CommandOrControl+H',
    role: 'hide',
  }, {
    label: 'Quit Netflix',
    accelerator: 'CommandOrControl+Q',
    role: 'quit',
  }],
}, {
  label: 'Edit',
  submenu: [{
    label: 'Undo',
    accelerator: 'CommandOrControl+Z',
    role: 'undo',
  }, {
    label: 'Redo',
    accelerator: 'CommandOrControl+Y',
    role: 'redo',
  }, {
    type: 'separator',
  }, {
    label: 'Cut',
    accelerator: 'CommandOrControl+X',
    role: 'cut',
  }, {
    label: 'Copy',
    accelerator: 'CommandOrControl+C',
    role: 'copy',
  }, {
    label: 'Paste',
    accelerator: 'CommandOrControl+V',
    role: 'paste',
  }, {
    label: 'Select All',
    accelerator: 'CommandOrControl+A',
    role: 'selectall',
  }],
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CommandOrControl+R',
    click: (menuItem, mainWindow) => {
      if (mainWindow) {
        mainWindow.reload();
      }
    },
  }],
}, {
  label: 'Window',
  submenu: [{
    label: 'Fullscreen',
    accelerator: 'CommandOrControl+F',
    role: 'togglefullscreen'
  },{
    label: 'Zoom',
    role: 'zoom',
  }, {
    label: 'Minimize',
    accelerator: 'CommandOrControl+M',
    role: 'minimize',
  }, {
    type: 'separator',
  }, {
    label: 'Toggle Frameless Window',
    accelerator: 'CommandOrControl+E',
    type: 'checkbox',
    checked: false,
    click: (menuItem, mainWindow) => {
      const isChecked = !menuItem.checked;

      if (isChecked) {
        createWindow();
      } else {
        createFramelessWindow();
      }
    },
  }, {
    label: 'Float on Top',
    accelerator: 'CommandOrControl+T',
    type: 'checkbox',
    checked: false,
    click: (menuItem, mainWindow) => {
      const isChecked = !menuItem.checked;

      mainWindow.setAlwaysOnTop(!isChecked);
    },
  }, {
    type: 'separator',
  }, {
    label: 'Show Inspector',
    accelerator: 'CommandOrControl+Alt+I',
    click: (menuItem, mainWindow) => {
      mainWindow.webContents.openDevTools();
    },
  }],
}];


/**
* Define window settings
*/
const windowSettings = {
  width: 1360, 
  height: 768,
  backgroundColor: '#000',
  useContentSize: false,
  resizable: true,
  center: true,
  alwaysOnTop: false,
  frame: true,
  title: 'Netflix',
  webPreferences: {
    nodeIntegration: false,
    plugins: true,
  },
};


/**
* Create new window
*/
const createWindow = () => {
  if (mainWindow) {
    mainWindow.close();
  }

  windowSettings.frame = true;
  mainWindow = new BrowserWindow(windowSettings);
  mainWindow.maximize();
  mainWindow.loadURL('https://www.netflix.com/');
};


/**
* Activate app
*/
const activateApp = () => {
  createFramelessWindow();
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
};


/**
* Create new frameless window
*/
const createFramelessWindow = () => {
  if (mainWindow) {
    mainWindow.close();
  }

  windowSettings.frame = false;
  mainWindow = new BrowserWindow(windowSettings);
  mainWindow.loadURL('https://www.netflix.com/');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.insertCSS(`
      html,
      body {
        -webkit-user-select: none;
        -webkit-app-region: no-drag;
      }
      a {
        -webkit-app-region: no-drag;
      }
      .logo {
        -webkit-app-region: drag;
      }
    `);
  });
};


/**
* Activate app when ready
*/
app.on('ready', activateApp);
