const programOptions = [
  { id: 1, value: "Program 1" },
  { id: 2, value: "Program 2" },
  { id: 3, value: "Program 3" },
  { id: 4, value: "Program 4" }
];
export default $axios => ({
  async getCommodities() {
    return programOptions;

    // return commodityOptions;
  }
});
