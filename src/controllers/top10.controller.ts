import superagent from 'superagent'
import {Request, Response, NextFunction} from 'express'
import mostUsedWordsFn from './../utils/functions'

export async function titlesLast25Controller (req: Request, res: Response, next: NextFunction) {
  // Get the Id ot the last Stories.
  const result = await superagent.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
  
  // Parse the result and get the top25
  const last25Stories: number[] = JSON.parse(result.text).slice(0,25)

  // Get the 25 last Stories in an array of promises 
  let arrTitles = last25Stories.map(async id => {
    const title = await superagent.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)

    interface ITitle { title: string }
    const titleJSON: ITitle = JSON.parse(title.text)

    return titleJSON.title.toLowerCase()
  })

  // Get the title content of all 25 stories
  const titles: string[] = await Promise.all(arrTitles)
  // Join all the titles into a big string and split it into words
  let titlesWords: string[] = [titles.join(',')][0].split(/(?:,| )+/)
 
  const top10_words = mostUsedWordsFn(titlesWords)

  res.status(200).json({top10_words})
}

