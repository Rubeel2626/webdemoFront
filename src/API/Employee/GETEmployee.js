async function GETEmployee(data) {
  let url = "https://localhost:7242/api/Employee";
  let head = { "Content-Type": "application/JSON", accept: "*/*" };
  let response = fetch(url, {
    headers: head,
    method: "GET",
  })
    .then((res) => res.json())
    .then(data);

  return response;
}
export default GETEmployee;
