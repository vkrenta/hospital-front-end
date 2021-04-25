export default function({ $axios, $config }, inject) {
  $axios.setBaseURL($config.serverURL);

  $axios.onError(error => {
    console.log(error);

    return Promise.reject();
  });

  const userAxios = $axios.create({
    baseURL: $config.serverURL,
  });

  userAxios.onError(error => {
    console.log(error);

    return Promise.reject();
  });

  inject('userAxios', userAxios);
}
