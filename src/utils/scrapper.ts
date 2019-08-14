import cheerio from 'cheerio'
import superagent from 'superagent'

export function getIDFromDate(url: string) {
  return superagent
    .get(url)
    .then(result => {
      let $ = cheerio.load(result.text)
      const firstID: number = Number($('.athing').attr('id'))

      return firstID
      }
    )
    .catch(err => console.log(err))
}





