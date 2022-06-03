const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  
  const fileStream = fs.createReadStream('app.log');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let output = "";
  let time = "";
  for await (const line of rl){
    // Each line in input.txt will be successively available here as `line`.
    //console.log(`Line from file: ${line.length}`);
    if(line.includes(' ')){
        output = output + time + " " +line + "\n";
    }else{
        time = line;
    }
  }
  
  fs.writeFileSync('output.log', output);
  console.log('done')
}

processLineByLine();