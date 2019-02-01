export default class Speech {
  static getVoice() {
    const msg = new SpeechSynthesisUtterance();
    let voices = [];
    voices = speechSynthesis.getVoices();
    msg.voice = voices.find(voice => voice.lang === "ja-JP");
    msg.lang = "ja-JP";
    msg.rate = 0.1;
    this.msg = msg;
  }

  static speak(text) {
    if (text.length < 3) text = text + "っ";
    this.msg.text = text;
    speechSynthesis.cancel();
    speechSynthesis.speak(this.msg);
  }
}
