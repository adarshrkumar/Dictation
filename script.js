var finaValu = ''
var prevValu = ''
var currValu = ''
var oSpeechRecognizer = null
var msg = document.querySelector('.msg')

function ChangeLang(e) {
  if (oSpeechRecognizer) {
    oSpeechRecognizer.lang = langEle.value;
    //SpeechToText()
  }
}

document.getElementById('selLang').addEventListener('change', ChangeLang)

if ('webkitSpeechRecognition' in window) {
} 
else {
  //speech to text not supported
  lblSpeak.style.display = 'none';
}

function SpeechToText() {
  msg.disabled = false
  if (oSpeechRecognizer) {
    if (chkSpeak.checked) {
      oSpeechRecognizer.start();
    } 
    else {
      oSpeechRecognizer.stop();
    }
    return;
  } 

  oSpeechRecognizer = new webkitSpeechRecognition();
  oSpeechRecognizer.continuous = true;
  oSpeechRecognizer.interimResults = true;
  oSpeechRecognizer.lang = selLang.value;
  oSpeechRecognizer.start();

  oSpeechRecognizer.onresult = function (e) {
    msg.disabled = 'true'
    var interimTranscripts = '';
    for (var i = e.resultIndex; i < e.results.length; i++) {
      var transcript = e.results[i][0].transcript;
      if (e.results[i].isFinal) {
        prevValu += currValu
        finaValu += currValu
        document.getElementById('msg').value = finaValu
        currValu = ''
        msg.disabled = false
      } 
      else {
        interimTranscripts += transcript;
        currValu = interimTranscripts
        prevValu = finaValu + interimTranscripts
        document.getElementById('msg').value = prevValu
      }

      msg.disabled = false
    }
  };

  oSpeechRecognizer.onerror = function (e) {};
}

