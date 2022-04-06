export default class APIService {
  static PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  static AWSAPI = 'http://cinesquare.yahmedora.com:9096';
  static LOCALAPI = 'http://192.168.104.90:8080';
}
