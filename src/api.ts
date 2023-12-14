import { destroyCookie } from "nookies";

const onResponce = (res) => {
  if (res.status === 401) {
    destroyCookie(null, "token");
    window.location.reload();
  }
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export type loginResponse = {
  granted_restaurants: [];
  message: string;
  restaurants: object[];
  token: string;
  userInfo: object;
};

class Api {
  path: string;
  constructor() {
    this.path = process.env.NEXT_PUBLIC_URL;
  }

  status() {
    return fetch(`${this.path}/`).then(onResponce);
  }

  login(body) {
    return fetch(`${this.path}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  getToken(body: string): Promise<loginResponse> {
    return fetch(`${this.path}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(onResponce);
  }

  register(body) {
    return fetch(`${this.path}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(onResponce);
  }

  getFullData() {
    return fetch(`${this.path}/data/full`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(onResponce);
  }

  addRestaurant(body) {
    return fetch(`${this.path}/restaurants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    }).then(onResponce);
  }

  addBooking(body) {
    return fetch(`${this.path}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    }).then(onResponce);
  }

  getBookings(body) {
    return fetch(`${this.path}/data/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    }).then(onResponce);
  }

  getSubusers(body) {
    return fetch(`${this.path}/data/inheritors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    }).then(onResponce);
  }
}

const api = new Api();

export default api;
