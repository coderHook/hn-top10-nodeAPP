import superagent from 'superagent'
import {Request, Response, NextFunction} from 'express'
import {mostUsedWordsFn, batchRequests} from './../utils/functions'
import { getIDFromDate } from './../utils/scrapper'

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

  res.status(200).json({
    titles,
    top10_words
  })
}


export async function inPostLastWeekController(req: Request, res: Response, next: NextFunction){
  // Get last week date
  function getLastWeek(): Date {
    const today: Date = new Date();
    console.log(today.getTime()/1000)
    const lastWeek: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);

    return lastWeek
  }

  // // Get lastWeek date and convert it to unixTime
  // const lastWeekUnix: number = getLastWeek().getTime()/1000

  // // Get maxitem Id from HN API
  // const maxItem = await superagent.get('https://hacker-news.firebaseio.com/v0/maxitem.json')

  // const maxItemID: number = Number(maxItem.text)

  // //Post from last Week will be the first on: time <= lastWeekUnix
  // let postLastWeek;
  // for (let i = maxItemID; i >= 0; i-=8000) {
  //   const post = await superagent(`https://hacker-news.firebaseio.com/v0/item/${i}.json?print=pretty`)

  //   const postJSON = JSON.parse(post.text)
  //   const time = postJSON.time

  //   if(time <= lastWeekUnix) {
  //     postLastWeek = postJSON
  //     break;
  //   }
  // }

  // const text: string[] = postLastWeek.text.split(' ')
  // const mostUsedWords: string[] = mostUsedWordsFn(text)

  const lastWeek: string = getLastWeek().toISOString().substring(0, 10);

  const url: string = `https://news.ycombinator.com/front?day=${lastWeek}`
  const IDPostLastWeek = await getIDFromDate(url)

  const post = await superagent(`https://hacker-news.firebaseio.com/v0/item/${IDPostLastWeek}.json?print=pretty`)

  const postJSON = JSON.parse(post.text)

  const text: string[] = (postJSON.title + postJSON.text).split(' ')
  const mostUsedWords: string[] = mostUsedWordsFn(text)

  res.status(200).send({
    IDPostLastWeek,
    'Date': lastWeek,
    mostUsedWords
  })
}


export async function inTitlesLast600HighKarma(req: Request, res: Response, next: NextFunction) {

  const users = ['tptacek', 'jacquesm', 'patio11', 'danso', 'ingve', 'ColinWright']

  const last600stories = await superagent.get(`https://hacker-news.firebaseio.com/v0/user/${users[0]}.json`)

  const submitted: number[] = JSON.parse(last600stories.text).submitted.slice(0, 600)

  //Create an array with all the urls we need to fetch
  let urls: string[] = []

  submitted.map(id => urls.push(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))

  // Fecth data with blueBird library to make batches and not overload the requests.
  const result = await batchRequests(urls)

  // Join and split the text by non alphanumeric characters.
  const text: string[] = result.join(',').split(/(?:,| )+/)
  const mostUsedWords: string[] = mostUsedWordsFn(text)

  res.status(200).send({
    numStories: submitted.length, 
    mostUsedWords
  })

}