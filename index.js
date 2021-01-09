const IPFS = require('ipfs-core');


(async () => {
	const node = await IPFS.create()
	
	console.log(`\n\n`)

	const intialData = `Random data ${Math.random()}`
	
	console.log(`Initial data ${intialData}`)

	const result = await node.add(intialData)

	const dataID = result.cid.toString()
	
	console.log(`Created cid: ${dataID}`)
	
	const stream = node.cat(dataID)
	
	let finalData = ''

	for await (const chunk of stream) {
		finalData += chunk.toString()
	}

	console.log(`Data received: ${finalData}`)
	
	console.log(`\n\n`)

	
	const stream2 = node.cat(`QmfGCeWzdLNVvJrKJtN3mJ3gaVE8eNpB9H6vds5pGh9zex`)

	let finalDataTest2 = ''

	for await (const chunk of stream2) {
		finalDataTest2 += chunk.toString()
	}

	console.log(`Data received: ${finalDataTest2}`)
})();
