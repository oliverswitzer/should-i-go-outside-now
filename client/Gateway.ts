import axios from "axios";
// @ts-ignore
import { PLACES_API_TOKEN } from 'react-native-dotenv'
import { fixtureData } from "./fixture";

type FixtureData = {
  [key: string]: PlaceType
}
function isFixtureData(data: any): data is FixtureData {
  return true
}

type PopularTime = {
  data: number[];
}
export type PlaceType = {
  name: string;
  rating: string;
  populartimes: PopularTime[]
}

class Gateway {
  _a = axios.create({
    baseURL: 'https://corona-errands-helper.herokuapp.com',
    timeout: 5000,
    headers: {'Authorization': `Token ${PLACES_API_TOKEN}`}
  });

  getPlace = (id: string): Promise<PlaceType> => {
    return this._a.get(`/places/${id}`)
      .then(response => response.data)
    // const data: any = fixtureData;
    // return Promise.resolve(data[id])
  }
    // this._a.get(`/places/${id}`)
    //   .then(response => response.data)

}

export const gateway = new Gateway();