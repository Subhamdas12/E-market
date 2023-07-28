export function createUser(userInfo) {
  return new Promise(async function (resolve, reject) {
    try {
      const response = await fetch("http://localhost:8080/auths/signup", {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (err) {
      reject(err);
    }
  });
}
export function loginUser(userInfo) {
  return new Promise(async function (resolve, reject) {
    try {
      const response = await fetch("http://localhost:8080/auths/login", {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
