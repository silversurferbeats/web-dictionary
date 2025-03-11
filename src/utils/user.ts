import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export const getUserId = () => {
  let userId = Cookies.get("userId");

  if (!userId) {
    userId = uuidv4(); // Genera un ID único
    Cookies.set("userId", userId, { expires: 365 }); // Guarda la cookie por 1 año
  }

  return userId;
};
