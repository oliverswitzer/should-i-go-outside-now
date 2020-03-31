import axios from "axios";
import { PLACES_API_TOKEN } from 'react-native-dotenv'
import { fixtureData } from "./fixture";
// import { fixtureData } from "./fixture";

class Gateway {

  _a = axios.create({
    baseURL: 'https://corona-errands-helper.herokuapp.com',
    timeout: 1000,
    headers: {'Authorization': `Token ${PLACES_API_TOKEN}`}
  });

  getPlace = (id) =>
    Promise.resolve(fixtureData[id])
    // this._a.get(`/places/${id}`)
    //   .then(response => response.data)

}

export const gateway = new Gateway();