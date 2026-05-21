export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
}

export const setRefreshToken = (token) => {
  localStorage.setItem(
    "refreshToken",
    token
  );
};

export const removeRefreshToken = () => {
  localStorage.removeItem("refreshToken");
};