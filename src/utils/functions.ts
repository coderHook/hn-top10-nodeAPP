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

  return top10_words
}

export function batchRequests (urls: string[]) {
  console.log('Im here!!!')
  const batchSize = 10;

  return parallel(urls.map(url => {
    return () => {
      return superagent.get(url)
    }
  }, batchSize)
  ).then( (result: any) => {
    console.log(result)
    return result
  })
}