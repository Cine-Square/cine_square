import axios from 'axios';
import APIService from './APIService';

const AWSAPI = APIService.AWSAPI;
const LOCALAPI = APIService.LOCALAPI;
const PROXY = APIService.PROXY;

export default class SignupService {
  static async completeSignup(account, password, userName) {
    const response = await axios({
      method: 'POST',
      url: `${PROXY}/user/signup`,
      // url: `${LOCALAPI}/user/signup`,
      data: {
        account: account,
        password: password,
        userName: userName,
      },
    });
    return response.data.result;
  }
  static async certificationNumber(account) {
    const response = await axios({
      method: 'POST',
      url: `${PROXY}/user/signup/sendAuthMail`,
      // url: `${LOCALAPI}/user/signup/sendAuthMail`,
      data: {
        account: account,
      },
    });
    return { result: response.data.result, code: response.data.code };
  }

  static async emailAuthentication(account) {
    const response = await axios.post(`${PROXY}/user/signup/valid`, {
      account,
    });
    return response.data.result;
  }
}
