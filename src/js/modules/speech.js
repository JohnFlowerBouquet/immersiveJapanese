export default class Speech {
  static getVoice() {
    const msg = new SpeechSynthesisUtterance();
    let voices = [];
    voices = speechSynthesis.getVoices();
    msg.voice = voices.find(voice => voice.lang === "ja-JP");
    msg.rate = 0.5;
    this.msg = msg;
  }

  static speak(text) {
    this.msg.text = text;
    console.log(text);
    console.log(this.msg);
    speechSynthesis.cancel();
    speechSynthesis.speak(this.msg);
  }
}
