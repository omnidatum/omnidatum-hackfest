const spawn = require('child_process').spawn;
const ls = spawn('./corenlp.sh', ['-annotators', 'tokenize,ssplit,pos,lemma,parse,sentiment', '-outputFormat', 'json']);
ls.stdin.write("i love you\n");

ls.stdout.on('data', (data) => {

data=data.toString('utf8');
console.log(typeof data)
if(typeof data != "string"){return}
if(data.substr(0,1)!='{'){return}
data = JSON.parse(data)

  console.log(`stdout: ${data}`);
});

/*ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});
*/
ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

