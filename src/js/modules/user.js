export default function user(name) {
  return {
    name: name,
    sound: true,
    setName(name) {
      this.name = name;
    },
    getName() {
      return this.name;
    }
  };
}
