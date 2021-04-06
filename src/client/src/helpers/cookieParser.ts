const cookies = () => {
    return document.cookie.split("XSRF-TOKEN=")[1];
  }

  export default cookies;
