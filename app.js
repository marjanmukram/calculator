var pressed_i = document.getElementById('pressed');
var inputNow_i = document.getElementById('input-now');
var btnPad_div = document.getElementById('btn-pad');
var isTyping = false;
var total = 0;
var opp = '';


var setPressed = function(val) {
  pressed_i.textContent = val;
};

var typingDigits = function(val) {
  var t = inputNow_i.textContent;
  if(val==='.' && t.indexOf('.')>-1) {
    return;
  }
  if(val==="+-") {
    var t1 = t.slice(0,1);
    if(t1==='-') {
      var t2 = t.slice(1);
      inputNow_i.textContent = t2;
    }else {
      inputNow_i.textContent = "-"+t;
    }
    return;
  }
  if(t.length>12) {
    window.alert("only 13 digits");
    return;
  }
  if(!isTyping) {
    inputNow_i.textContent = val;
    isTyping = true;
  }
  else {
    inputNow_i.textContent += val;
  }
};

var backSpace = function() {
  var t = inputNow_i.textContent;
  var tLen = t.length;
  if(tLen>1) {
    newT = t.slice(0, t.length-1);
    isTyping = true;
  }
  else {
    newT = 0;
    isTyping = false;
  }
  inputNow_i.textContent = newT;
};

var clearNow = function(val) {
  inputNow_i.textContent = '0';
  isTyping = false;
};

var clearFull = function() {
  clearNow();
  total = 0;
  opp = '';
};

var opperations = function(val) {
  var oppObj = {
    '': function(t) {return t;},
    '+': function(t) {return total+t;},
    '-': function(t) {return total-t;},
    '*': function(t) {return total*t;},
    '/': function(t) {return total/t;},
  };
  var t = Number(inputNow_i.textContent);
  if(val!=='=' && !isTyping) {
    opp = val;
    return;
  }
  total = oppObj[opp](t);
  isTyping = false;
  inputNow_i.textContent = total;
  opp = val;
};

var eqFunc = function(val) {
  opperations(val);
  isTyping = false;
  total = 0;
  opp = '';
};

var actionsObj = {
  'opp': opperations,
  'type': typingDigits,
  'ce': clearFull,
  'c': clearNow,
  'b': backSpace,
  'eq': eqFunc
};

btnPad_div.addEventListener("click", function(e){
  var clickObj = e.target;
  var action = clickObj.dataset.action;
  if(Boolean(action)) {
    var value = clickObj.dataset.value;
    actionsObj[action](value);
    setPressed(value);
  }
});
