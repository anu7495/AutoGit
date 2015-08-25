#! /usr/bin/env node
var test = require('child_process').exec;

var check = test('git add -u -n', function(err, stdout, stderr){
  if(stdout.length == 0)
    console.log('No Files Modified.');
  else
    autogit();
});

function myTrim(x) {
    return x.replace(/^\s+/,'');
}

function autogit() {
  var spawn = require('child_process').spawn;
  var st, ad;

  var status = spawn('git', ['status', '-s', '-uno']);

  status.stdout.on('data', function(data){
    st = data.toString();
  });

  var add = spawn('git', ['add', '-u', '-v']);

  add.stdout.on('data', function(data){
    ad = data.toString();
  });

  add.on('close', function(){
    var commit = spawn('git', ['commit', '-m', process.argv[2]]);
    commit.on('close', function(){
      console.log(myTrim(st) + ad + 'commit successful');
    });
  });
}
