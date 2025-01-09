import apiService from './apiService'

export default async (q: string) => {
  const resp: { word: string, score: number }[] = await apiService({ url: `${process.env.DICTIONARY_API_URL}?sp=${q}*&max=5` })

  return { words: resp.map((item: { word: string }) => item.word) }
}
