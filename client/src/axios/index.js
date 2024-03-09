const devURL = "http://localhost:3005/";

const proURL = "https://dev-unsplash.herokuapp.com/";

const base_url = process.env.NODE_ENV === "production" ? proURL : devURL;

export default base_url;
