import express, {Request, Response, NextFunction} from 'express'
import superagent from 'superagent'

const router = express.Router()

/**
 * Get the Top 10 words used in Titles of last 25 stories.
 */
router.get('/in-titles-last-25-Stories', async (req: Request, res: Response, next: NextFunction) => {
  // Get the Id ot the last Stories.
  const result = await superagent.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
  
  const last25Stories: number[] = JSON.parse(result.text).slice(0,25)

  // Get the 25 last Stories
  let arrTitles = last25Stories.map(async id => {
    const title = await superagent.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)

    interface ITitle { title: string }
    const titleJSON: ITitle = JSON.parse(title.text)

    return titleJSON.title.toLowerCase()
  })

  const titles: string[] = await Promise.all(arrTitles)

  let titlesWords: string[] = [titles.join(',')][0].split(/(?:,| )+/)
 
  interface IMostUsed {[key: string]: number}
  let mostUsedWords = <IMostUsed>{}

  let count: number;

  // Create the object with the repeated words and the times they appear
  for (let i=0; i<titlesWords.length; i++) {
    count = 0;

    for (let j=i+1; j< titlesWords.length; j++) {

      // Check if the words are equal
      if(titlesWords[i] === titlesWords[j]) {
        count = count + 1;
        // Add the word to our Object
        mostUsedWords[titlesWords[i]] = count
        // Remove word from the array to avoid duplication
        titlesWords[j] = '-'
      }
    }
  }

  // Delete the char used to mark that the word was read '-'
  delete mostUsedWords['-']

  //Sort the Object by values and get the top10
  const top10_words: string[] = Object.keys(mostUsedWords).sort((a: string, b: string) => mostUsedWords[b] - mostUsedWords[a]).slice(0, 10)

  console.log("mostUsedWords", mostUsedWords)

  res.status(200).json({top10_words})
})

export default router