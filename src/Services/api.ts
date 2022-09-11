import axios from 'axios';
import { baseUrlApi } from '../Utils/urls';

export default axios.create({
  baseURL:baseUrlApi
});