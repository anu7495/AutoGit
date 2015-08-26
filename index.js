#! /usr/bin/env node
var test = require('child_process').exec;

var check = test('git add -u -n', function(err, stdout, stderr){
  if(stdout.length == 0)
    console.log('No Files Modified.');
  else
    autogit();
});

function autogit() {
  var spawn = require('child_process').spawn;
  var st;

  var status = spawn('git', ['status', '-s', '-uno']);

  status.stdout.on('data', function(data){
    st = data.toString().split('\n');
    for(i=0;i<st.length;i++) {
      console.log(st[i].trim());
    }
  });

  var add = spawn('git', ['add', '-u', '-v']);

  add.stdout.on('data', function(data){
    console.log(data.toString());
  });

  add.on('close', function(){
    var commit = spawn('git', ['commit', '-m', process.argv[2]]);
    commit.on('close', function(){
      console.log('Commit Successful');
    });
  });
}
