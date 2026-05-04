const Storage = {
  save(city) {
    let data = JSON.parse(localStorage.getItem("recent")) || [];
    if (!data.includes(city)) data.unshift(city);
    data = data.slice(0, 5);
    localStorage.setItem("recent", JSON.stringify(data));
  },

  get() {
    return JSON.parse(localStorage.getItem("recent")) || [];
  }
};