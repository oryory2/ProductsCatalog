
  // authentication helpers
  export const setToken = (token: string) => {
    sessionStorage.setItem('token', token);
  };
  
  export const getToken = () => {
    return sessionStorage.getItem('token');
  };

  // username helpers
  export const setUser = (username: string) => {
    sessionStorage.setItem('username', username);
  };
  
  export const getUsername = () => {
    return sessionStorage.getItem('username') || "";
  };

  


  