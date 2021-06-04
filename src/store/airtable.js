import { baseURL } from "../../config";
import {v4 as uuidv4} from 'uuid';
import {Alert} from 'react-native'

const baseurl = `https://api.airtable.com/v0/appQqO16KrlaKtsyL/db`

export function getAirtableData(mapFunction) {
  return fetch(`${baseurl}?view=Grid%20view`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer keyllUfIbKpAKqs96'
    }
  })
  .then(res => res.json())
  .then(res => res.records?.map(mapFunction)
  )
}

export function getAirtableList() {
    return getAirtableData(({fields}) => {
      return {Link, url} = fields
    })
}

export function getAirtableSlugs() {
  return getAirtableData(({fields}) => fields.slug)
}

export function addAirtableUrl(url, slug) {
    return fetch(baseurl, {
        method: 'post',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer keyllUfIbKpAKqs96'
        },
        body: JSON.stringify({
          records: [{
            fields: {
              Link: `https://url.ly/${slug}`,
              url: url,
              slug: slug
            }}
          ]
        })
    }).then(res => res.json())
}

const getRandomSlug = () => uuidv4().slice(0, 5);

export const slugGen = async (overrideStr = '') => {
    const slugs = await getAirtableSlugs();

    console.log('slugs:', slugs);

    const randomSlug = getRandomSlug();
    let newSlug = !overrideStr.length ? randomSlug : overrideStr;

    if (slugs.includes(newSlug) && overrideStr) {
      Alert.alert('This slug is already taken', 'Please enter a new one');
    } else {
      while (slugs.includes(randomSlug)) {
        newSlug = getRandomSlug();
      }
      return newSlug;
    }
};