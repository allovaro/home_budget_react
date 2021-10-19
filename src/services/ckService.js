export default class CkService {
    baseUrl = 'http://localhost:7000/api/';

    postRequest = async (url, obj) => {
        const body = JSON.stringify(obj);
        console.log(body);

        const res = await fetch(`${this.baseUrl}${url}`, {
            method: 'POST', // или 'PUT'
            body, // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await res.json();
        if (!res.ok) {
            throw new Error(`Could not fetch ${this.baseUrl}${url}`
            + `, received ${res.status}`);
        }
        return json;
    };

    getRequest = async url => {
        const res = await fetch(`${this.baseUrl}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${this.baseUrl}${url}`
            + `, received ${res.status}`);
        }
        return await res.json();
    }
}
