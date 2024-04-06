const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const DataStore = require('./renderer/MusicDataStore')

const myStore = new DataStore({
  name: 'Music Data'
})

// const Store = require('electron-store')
// // 未设置名称，默认 config.json
// const store = new Store()

// console.log(app.getPath('userData'))

// store.set('unicorn', 'jack')
// console.log(store.get('unicorn'))

// store.set('foo.bar', true)
// console.log(store.get('foo'))

// store.delete('unicorn')
// console.log(store.get('unicorn'))

class AppWindow extends BrowserWindow {
  constructor(config, fileLocation) {
    const baseConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        // 必须要有 contextIsolation: false 这个属性，否则引用require语法报错
        contextIsolation: false
      }
    }
    // const finalConfig = Object.assign(baseConfig, config)
    const finalConfig = { ...baseConfig, ...config }
    super(finalConfig)
    this.loadFile(fileLocation)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}


app.on('ready', () => {
  const mainWindow = new AppWindow({}, './renderer/index.html')
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.send('getTracks', myStore.getTracks())
  })
  ipcMain.on('add-music-window', (event, arg) => {
    const addWindow = new AppWindow({
      width: 500,
      height: 400,
      parent: mainWindow
    }, './renderer/add.html')
  })


  ipcMain.on('add-tracks', (event, tracks) => {
    // console.log(tracks)
    const updatedTracks = myStore.addTracks(tracks).getTracks()
    // console.log(updatedTracks)
    mainWindow.send('getTracks', updatedTracks)
  })

  ipcMain.on('delete-track', (event, id) => {
    const updatedTracks = myStore.deleteTrack(id).getTracks()
    // console.log(updatedTracks)
    mainWindow.send('getTracks', updatedTracks)
  })

  ipcMain.on('open-music-file', (event) => {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'Music', extensions: ['mp3'] }]
    }).then(({canceled, filePaths}) => {
        console.log(filePaths)
        if (filePaths) {
          event.sender.send('selected-file', filePaths)
        }
        // console.log(filePaths)
      }).catch(err => {
        console.log(err)
      })
  })


  // const mainWindow = new BrowserWindow({
  //   width: 800,
  //   height: 600,
  //   webPreferences: {
  //     nodeIntegration: true,
  //     // 必须要有 contextIsolation: false 这个属性，否则引用require语法报错
  //     contextIsolation: false
  //   }
  // })
  // // mainWindow.loadFile('index.html')
  // mainWindow.loadFile('./renderer/index.html')


  // ipcMain.on('add-music-window', (event, arg) => {
  //   // console.log('hello from index page')
  //   const addWindow = new BrowserWindow({
  //     width: 500,
  //     height: 400,
  //     webPreferences: {
  //       nodeIntegration: true,
  //       // 必须要有 contextIsolation: false 这个属性，否则引用require语法报错
  //       contextIsolation: false
  //     },
  //     parent: mainWindow
  //   })
  //   addWindow.loadFile('./renderer/add.html')
  // })


  // ipcMain.on('message', (event, arg) => {
  //   console.log(arg)
  //   // event.sender.send('reply', 'hello from main')
  //   // event.sender 等价于 mainWindow
  //   mainWindow.send('reply', 'hello from main')
  // })


  // const secondWindow = new BrowserWindow({
  //   width: 400,
  //   height: 300,
  //   webPreferences: {
  //     nodeIntegration: true
  //   },
  //   parent: mainWindow
  // })

  // secondWindow.loadFile('second.html')
})
