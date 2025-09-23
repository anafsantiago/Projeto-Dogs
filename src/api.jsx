const API_URL = "https://dogsapi.origamid.dev/json";

export function USER_POST(body) {
  return {
    url: API_URL + "/api/user",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_POST(body) {
  return {
    url: API_URL + "/jwt-auth/v1/token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_GET(token) {
  return {
    url: API_URL + "/api/user",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function TOKEN_VALIDATE_POST(token) {
  return {
    url: API_URL + "/jwt-auth/v1/token/validate",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function PHOTO_POST(token, formData) {
  return {
    url: API_URL + "/api/photo",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    },
  };
}

export function PHOTO_GET() {
  return {
    url: {
      endpoint: {
        photos: API_URL + "/api/photo",
        photos_query: API_URL + "/api/photo/?_total=9&_page=1&_user=0",
        photo: API_URL + "/api/photo/:id",
      },
    },
    options: {
      method: "GET",
    },
  };
}
