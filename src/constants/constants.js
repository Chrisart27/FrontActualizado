export const SERVER_PROTOCOL = "http"; // https
export const SERVER_DOMAIN = "localhost"; // backdesgruapchat.onrender.com
export const SERVER_PORT = "3000";
export const SERVER_URL = `${SERVER_PROTOCOL}://${SERVER_DOMAIN}${
  SERVER_PORT ? `:${SERVER_PORT}` : ""
}`;
