import Mock from "mockjs";

const Random = Mock.Random;

//  Mock needs to give three parameters, the URL (the URL of the AXIOS is matched, I am using the local domain name directly).
//  Request type: get posket ... Other reading documents
//  Data processing functions, functions require returnad data
// Mock.mock("http://localhost:8082/test/city", "get", () => {
//   let citys = [];
//   for (let i = 0; i < 10; i++) {
//     let obj = {
//       id: i + 1,
//       city: Random.city(),
//       color: Random.color()
//     };
//     citys.push(obj);
//   }
//   return { cityList: citys };
// });
//  POST request, with parameters, parameters return in Data, return three parameters of URL, TYPE, BODY, can print Data to see
Mock.mock("http://localhost:8082/test/cityInfo", "post", data => {
  //  The parameters that the request is sent in Body, and the JSON string is transmitted, it needs to be essential
  const info = JSON.parse(data.body);
  return {
    img: Random.image("200x100", "#4A7BF7", info.name)
  };
});
