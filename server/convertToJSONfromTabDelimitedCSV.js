const fs = require('node:fs');
console.log('hello');
const partsObject = {};
fs.readFile('C:/Users/sumer/Downloads/Parts.csv', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    //console.log(data);
    console.log('data loaded: ' + data.length);
		let partNumber = '';
		let partDescription = '';
		let UOM = '';
		let price = '';
		let cost = '';
		let location = '';
		data.split('\r\n').forEach(line => {
			const fields = line.split('\t');
			partNumber = fields[0];
			partDescription = fields[1];
			UOM = fields[2];
			price = fields[3];
			cost = fields[4];
			location = fields[5];
			partsObject[partNumber] = {};
			partsObject[partNumber]['description'] = partDescription;
			partsObject[partNumber]['UOM'] = UOM;
			partsObject[partNumber]['price'] = price;
			partsObject[partNumber]['cost'] = cost;
			partsObject[partNumber]['location'] = location;
			
		});
    // for(let i = 0; i < 1000; i++){
    //   if(data[i] === '\t')console.log('found tab');
		// 	if(data[i] === '\r')console.log('found carriage return');
		// 	if(data[i] === '\n')console.log('found new line return');
			
			
    // }
		console.log(partsObject['552055-001P']);
		fs.writeFile('C:/Users/sumer/Downloads/Parts.json', JSON.stringify(partsObject,null,2), err => {
			if (err) {
				console.error(err);
				
			}
			
			// file written successfully
		});
  });
	