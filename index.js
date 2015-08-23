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

  var status = spawn('git', ['status', '-s', '-uno']);

  status.stdout.on('data', function(data){
    console.log(data.toString());
  });

  var add = spawn('git', ['add', '-u', '-v']);

  add.stdout.on('data', function(data){
    console.log(data.toString());
  });

  add.on('close', function(){
    var commit = require('child_process').spawn('git', ['commit', '-m', process.argv[2]]);
  });
}


