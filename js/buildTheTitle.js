const blueColorCode = '#53C0FF';
const redColorCode = '#ff3105';
const yellowColorCode = '#ffd805';
const greenColorCode = '#7ED957'

const beigeColor = "#F5F5DC"
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


function addEventListenerList(list, event, fn) {
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener(event, fn, false);
  }
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

function removeWord(e) {
  const element = e.target
  element.remove();
}

function checkTitle() {

  revealHints()
  // gathering data
  const dropzoneDiv = document.querySelector("#dropZone");
  const resultDiv = document.querySelector("#result")
  const select = document.getElementById("newsPaperSelect");
  const value = select.value;
  const wordElems =  [...dropzoneDiv.children];
  const userTitle = wordElems.reduce((acc, wordElem) => {
    acc += wordElem.innerText + " ";
    return acc;
  }, '')
  const journalTitle = data[value].title;
  const userTitleArray = userTitle.split(" ");
  const journalTitleArray = journalTitle.split(" ");
  const journalTitleLength = journalTitleArray.length;
  // score computation

  wordElems.forEach((wordElem, idx) => {

    if(!journalTitleArray.includes(wordElem.innerText)) {
      wordElem.style.backgroundColor = redColorCode;
      return;
    }
    if(journalTitleArray.indexOf(wordElem.innerText) === idx) {
      wordElem.style.backgroundColor = greenColorCode;
      return;
    }
    wordElem.style.backgroundColor = yellowColorCode;

  })
}

function resetSelectedWordsBackground(){
  const dropzoneDiv = document.querySelector("#dropZone");
  const wordElems =  [...dropzoneDiv.children];
  wordElems.forEach((wordElem, idx) => {
    wordElem.style.backgroundColor = beigeColor;
  })

  }

  function revealHints() {
    const hintsElem = document.querySelector("#hints")
    hintsElem.style.display = 'block'
  }


 function onCtaRevealClick() {
   const answerDiv = document.querySelector("#answer")
   if( answerDiv.innerHTML === '') {
     revealAnswer()
   }else {
     hideAnswer();
   }
 }
function hideAnswer() {
  const ctaReveaElem = document.querySelector("#ctaReveal")
  const answerDiv = document.querySelector("#answer")

  answerDiv.innerHTML = '';
  ctaReveaElem.innerText = 'Reveal The Real Title !';
}

function revealAnswer() {
  const answerDiv = document.querySelector("#answer")
  const ctaReveaElem = document.querySelector("#ctaReveal")
  ctaReveaElem.innerText = 'hide the Title !';
  const select = document.getElementById("newsPaperSelect");
  const value = select.value;
  const journalTitle = data[value].title;
  const articleUrl = data[value].url;
  answerDiv.innerHTML = `<h2>${journalTitle}</h2><a href="${articleUrl}" target="_blank" >Read the article !</a>`
}

function moveWords(e) {
    if (this.parentNode.id === "wordsBag") {
      document.getElementById('dropZone').appendChild(e.target);
    } else {
      e.target.style.backgroundColor = beigeColor;
      document.getElementById('wordsBag').appendChild(e.target);
    }
}

function onNewsSourceChange() {
  resetSelectedWordsBackground();
  hideAnswer();

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
  },
  // bbc: {
  //   name: "BBC",
  //   title: "Luis Rubiales given Spanish restraining order over World Cup kiss",
  //   url: 'https://www.bbc.com/news/world-europe-66818691.amp'
  // },
  foxnews: {
    name: 'Fox News',
    title: 'Luis Rubiales given restraining order after denying wrongdoing in front of Spanish judge',
    url: 'https://www.foxnews.com/sports/spanish-fa-president-refuses-resign-kissing-controversy-calls-out-false-feminism'
  }
}


const extraWords = ["judge", "with"]


const init = () => {

  const selectElem = document.getElementById('newsPaperSelect');

  selectElem.appendChild(createElmt(Object.keys(data).reduce((acc, journalId) => {
    const journalName = data[journalId].name
    acc += `<option value="${journalId}" >${journalName}</option>`;
    return acc
  }, '')))

  const words = Object.values(data).reduce((acc, journal) => {
    const words = journal.title.split(" ");
    acc = [...acc, ...words]
    return acc;
  }, []);
  const shuffledWords = shuffle([...words, ...extraWords]);
  const wordBagDiv = document.querySelector("#wordsBag")
  const dropzoneDiv = document.querySelector("#dropZone")
  const ctaCheckElem = document.querySelector("#ctaCheck")
  const ctaReveal = document.querySelector("#ctaReveal")


  wordBagDiv.appendChild(
    createElmt(shuffledWords.reduce((acc, word, idx) => {
       acc += `<div class="word" draggable="true" id="word${idx}"  >${word}</div>`;
      return acc
    }, ''))
  )


   const renderedWords = document.querySelectorAll('.word');
  addEventListenerList(renderedWords, "click", moveWords)


  ctaCheckElem.addEventListener('click', checkTitle)
  ctaReveal.addEventListener('click', onCtaRevealClick)

  const select = document.querySelector("#newsPaperSelect");
  select.addEventListener("change", onNewsSourceChange);


}



init()
