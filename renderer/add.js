const { ipcRenderer } = require('electron')
const { $ } = require('./helper')
const path = require('path')
let musicFilesPath = []

$('select-music').addEventListener('click', () => {
    ipcRenderer.send('open-music-file')
})

$('add-music').addEventListener('click', () => {
    // TODO 添加校验
    ipcRenderer.send('add-tracks', musicFilesPath)
})


const reenderListHTML = (paths) => {
    const musicList = $('musicList')
    const musicItemsHTML = paths.reduce((html, music) => {
        html += `<li class="list-group-item">${path.basename(music)}</li>`
        return html
    }, '')
    musicList.innerHTML = `<ul class="list-group">${musicItemsHTML}</ul>`
}


ipcRenderer.on('selected-file', (event, path) => {
    // console.log(path)
    if (Array.isArray(path)) {
        musicFilesPath = path
        // console.log(musicFilesPath)
        reenderListHTML(path)
    }
})

// document.getElementById('select-music').addEventListener('click', () => {
//     ipcRenderer.send('select-music')
// })