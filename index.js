const { app, BrowserWindow } = require('electron')

const IPFS = require('ipfs-core')
const CID = require('cids')
const uint8ArrayFromString = require('uint8arrays/from-string')
const uint8ArrayToString = require('uint8arrays/to-string')
const path = require('path')

app.whenReady().then(() => {

	const win = new BrowserWindow({ 
		webPreferences: {
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js')
		},
		width: 800, 
		height: 600
	})

	win.loadURL(`file://${__dirname}/index.html`)

	
	
})

