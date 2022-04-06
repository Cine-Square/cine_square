import axios from 'axios';
import APIService from './APIService';

const AWSAPI = APIService.AWSAPI;
const LOCALAPI = APIService.LOCALAPI;
const PROXY = APIService.PROXY;

export default class SearchService {
  static async getSearchList(value) {
    const response = await axios.get(
      // `${LOCALAPI}/movie/search?searchWord=${value}`,
      `${PROXY}/movie/search?searchWord=${value}`,
    );
    return response.data.result;
  }
}
