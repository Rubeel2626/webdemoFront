async function UPDATEEmployee(data) {
  let url = "https://localhost:7242/api/Employee";
  let head = {
    "Content-Type": "application/JSON",
    accept: "*/*",
  };
  let response = await fetch(url, {
    method: "PUT",
    headers: head,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(data);
  return response;
}
export default UPDATEEmployee;
