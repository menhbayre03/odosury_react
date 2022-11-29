import querystring from "querystring";
class Api {
    static login(url, data) {
        return fetch(url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data),
        }).then((res) => res.json());
    }
    static async get(url, data) {
        let currentUrl = `${url}`;
        if (data) {
            currentUrl += "?" + querystring.stringify(data);
        }
        const res = await fetch(currentUrl, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
            credentials: "same-origin",
        });
        return await res.json();
    }
}

export default Api;
