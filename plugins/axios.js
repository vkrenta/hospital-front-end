export default function({ $axios, $config }, inject) {
  $axios.setBaseURL($config.serverURL);

  $axios.onError(error => {
    console.log(error);
  });

  const userAxios = $axios.create({
    baseURL: $config.serverURL,
  });

  userAxios.onError(error => {
    console.log(error);
  });

  inject('userAxios', userAxios);
}
