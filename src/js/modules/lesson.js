export default class Lesson {
  constructor(entries) {
    this.entries = entries;
  }
  static load(url) {
    return fetch(url)
      .then(response => response.json())
      .then(entries => new this(entries))
      .catch(function(error) {
        console.log(error);
      });
  }

  getData() {
    return this.entries;
  }
}
