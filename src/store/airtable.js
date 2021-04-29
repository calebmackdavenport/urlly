import { baseURL } from "../../config";
import {v4 as uuidv4} from 'uuid';

export function getAirtableList() {
    return fetch(`${baseURL}/list`)
        .then(res => res.json())
}

export function getAirtableSlugs() {
    return fetch(`${baseURL}/list/slugs`)
        .then(res => res.json())
}

export function addAirtableUrl(url, slug) {
    return fetch(`${baseURL}/list/new`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            url: url,
            slug: slug
        })
    }).then(res => res.json())
}

const getRandomSlug = () => uuidv4().slice(0, 5);

export const slugGen = async (overrideStr = '') => {
    const slugs = await getAirtableSlugs();
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