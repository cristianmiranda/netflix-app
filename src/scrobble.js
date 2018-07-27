function scrobble() {
  
  var remote = require('electron').remote;
  var mainWindow = remote.getGlobal('mainWindow');
  var ipcMain = require("electron").remote.ipcMain;

  ipcMain.on('query', function (event, value) {
      console.log(value);
  });

  process.stdout.write('Scrobbling...\n');
  mainWindow.webContents.executeJavaScript(
      `
        let profileIcon = document.getElementsByClassName('profile-icon');
        let img = profileIcon[0].src;
        var ipcRenderer = require('electron').ipcRenderer;
        ipcRenderer.send('query', img);
      `,
          result => {
      process.stdout.write('RESULT...\n');
      // process.stdout.write(result);
  });

  /*
  runXpath('//img[contains(@class, "profile-picture")]', result => {
    process.stdout.write(result);
  });
  */
  /*
  var sleep = require('system-sleep');
  while (1) {
    process.stdout.write('Scrobbling... ' + x + '\n');
    //div[contains(@class, "ellipsize-text")]/h4
    //div[contains(@class, "ellipsize-text")]/span[1]
    //div[contains(@class, "current-progress")]
    mainWindow.webContents.executeJavaScript(`document.querySelector('//div[contains(@class, "ellipsize-text")]/h4').value`, function (result) {
      console.log(result);
    });
    sleep(4000);
  }
  */
  return 'never gonna get here';
}

module.exports = scrobble;