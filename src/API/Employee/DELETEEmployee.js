async function DELETEEmployee(senddata) {
  let url = "https://localhost:7242/api/Employee/" + senddata.id;
  let head = {
    "Content-Type": "application/JSON",
    accept: "*/*",
  };
  let data = {};
  let response = await fetch(url, {
    headers: head,
    method: "DELETE",
    body: JSON.stringify(senddata),
  })
    .then((res) => res.json())
    .then(data);
  return response;
}
export default DELETEEmployee;
