import superagent from 'superagent'
//@ts-ignore
import parallel from 'async-await-parallel'

/**
 * Get the Top10 Most used words from an array of strings: string[]
 * @param titlesWords Array of strings that contain all the words to analyze.
 */
export function mostUsedWordsFn (titlesWords: string[]) {
  interface IMostUsed {[key: string]: number}
  let mostUsedWords = <IMostUsed>{}

  let count: number;

  // Create the object with the repeated words and the times they appear
  for (let i=0; i<titlesWords.length; i++) {
    count = 0;

    for (let j=i+1; j< titlesWords.length; j++) {
      mostUsedWords[titlesWords[i]] = count
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
  let top10_words: string[]
  if(Object.keys(mostUsedWords).length > 10) {
    top10_words = Object.keys(mostUsedWords).sort((a: string, b: string) => mostUsedWords[b] - mostUsedWords[a]).slice(0, 10)
  } else {
    top10_words = Object.keys(mostUsedWords)
  }

  return top10_words
}

/**
 * Make a batch Request in parallel to not overload fetching.
 * @param urls Array of urls for each of the items
 */
export function batchRequests (urls: string[]) {
  console.log('Please wait about 2 minuts to get all the 600 entries')
  const batchSize = 50;

  return parallel(urls.map(url => {
    return async () => {
      const request = await superagent.get(url)

      const textJSON = JSON.parse(request.text)

      if(textJSON.text) {
        return textJSON.text.toLowerCase()
      }
      
      return ' ';
    }
  }, batchSize)
  ).then( (result: any) => {
    console.log(result)
    return result
  })
  .catch((err:any) => console.log(err))
}