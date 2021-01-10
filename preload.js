const { contextBridge } = require('electron')
const IPFS = require('ipfs-core')
const CID = require('cids')
const uint8ArrayFromString = require('uint8arrays/from-string')
const uint8ArrayToString = require('uint8arrays/to-string')
const path = require('path')

let node 
let user

contextBridge.exposeInMainWorld('bridge', {
	send: async (messagevalue) => {
		const send = uint8ArrayFromString(JSON.stringify({
			user,
			message: messagevalue
		}))

		node.pubsub.publish("test", send).then((a,b) => {
			console.log('🍾')
		}).catch((err) => {
			console.log("error",err)
		})
	},
	init: async (username, ports_inc , messageReceived) => {
		user = username
		node = await IPFS.create({
			repo: 'cache/'+username,
			config:{
				"Addresses": {
					"API": `/ip4/127.0.0.1/tcp/${5002+ports_inc}`,
					"Gateway": `/ip4/127.0.0.1/tcp/${8081+ports_inc}`,
					"Swarm": [
						`/ip4/0.0.0.0/tcp/${4002+ports_inc}`,
						`/ip6/::/tcp/${4002+ports_inc}`
					]
				}
			}
		})

		node.pubsub.subscribe("test", (pub) => {

			const res = JSON.parse(uint8ArrayToString(pub.data))

			messageReceived(res)

		})

	}
})


