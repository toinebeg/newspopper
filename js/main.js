function createElmt(htmlStr) {
  var
    helper = document.createElement('div'),
    result = document.createDocumentFragment(),
    i = 0, num;

  helper.innerHTML = htmlStr;

  for (num = helper.childNodes.length; i < num; i += 1) {
    result.appendChild(helper.childNodes[i].cloneNode(true))
  }

  return result;
}


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const data = {
  reuters : {
    name: "Reuters",
    title: "Restraining order imposed on ex-Spain soccer boss as he testifies in assault probe",
    url: "https://www.reuters.com/world/europe/spains-ex-soccer-boss-rubiales-due-court-sex-assault-investigation-2023-09-14/"
  },
  aljazeera: {
    name: "Al Jazeera",
    title : "Restraining order imposed on scandal-hit ex-Spain football boss Rubiales",
    url: "https://www.aljazeera.com/news/2023/9/15/spains-former-football-boss-rubiales-in-court-over-world-cup-kiss-scandal"
  },

  thesun : {
    name: "The Sun",
    title: "KISS SHAME Ex-Spain FA chief Luis Rubiales hit with restraining order and banned from contacting Jenni Hermoso after kiss outrage",
    url : "https://www.thesun.co.uk/sport/23967243/luis-rubiales-court-denying-wrongdoing-jenni-hermoso/"
  }
}




const init = () => {


  const words = Object.values(data).reduce((acc, journal) => {
    const words = journal.title.split(" ");
    acc = [...acc, ...words]
    return acc;
  }, [])
  const shuffledWords = shuffle(words)
  const wordBagDiv = document.querySelector("#wordsBag")


  wordBagDiv.appendChild(
    createElmt(shuffledWords.reduce((acc, word) => {

       acc += `<div class="word" >${word}</div>`

      return acc
    }, ''))
  )

  console.log("coucou", words)


}



init()
