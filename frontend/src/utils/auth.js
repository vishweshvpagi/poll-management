export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? true : false;
};
