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

function onDragStart(event) {

//  console.log("dragStart ", event)
  event
    .dataTransfer
    .setData('text/plain', event.target.id);

  event.dataTransfer.dropEffect = "copy";

  event
    .currentTarget
    .style
    .backgroundColor = '#53C0FF';

}

function onDragOver(event) {

 // console.log("drag over", event)
  event.preventDefault();
}


function removeWord(e) {
  const element = e.target
  element.remove();
}

function onDrop(event) {

  const dropzoneDiv = document.querySelector("#dropZone")

//  console.log("drop", event)

  const id = event
    .dataTransfer
    .getData('text');

  console.log(id)
  const draggableElement = document.getElementById(id);
  const nodeCopy = draggableElement.cloneNode(true);
  nodeCopy.id = draggableElement.id + "_selected";
  nodeCopy.addEventListener('click', removeWord)
  dropzoneDiv.appendChild(nodeCopy);

  event
    .dataTransfer
    .clearData();
}


function checkTitle() {
  const dropzoneDiv = document.querySelector("#dropZone");
  const resultDiv = document.querySelector("#result")
  const select = document.getElementById("newsPaperSelect");
  const value = select.value;
  const userTitle = [...dropzoneDiv.children].reduce((acc, wordElem) => {
    acc += wordElem.innerText + " ";
    return acc;
  }, '')
  const journalTitle = data[value].title;
  const userTitleArray = userTitle.split(" ");
  const journalTitleArray = journalTitle.split(" ");
  const journalTitleLength = journalTitleArray.length;
  const diff = _.difference(userTitleArray, journalTitleArray);
  const score = journalTitleLength - diff.length;
  const percent = score/journalTitleLength * 100
  console.log({value, userTitle, journalTitle, diff, score })

  resultDiv.innerText = `You are ${Math.floor(percent)}% there`;

}

function revealTitle() {
  const answerDiv = document.querySelector("#answer")

  const select = document.getElementById("newsPaperSelect");
  const value = select.value;
  const journalTitle = data[value].title;
  answerDiv.innerHTML = journalTitle
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
  bbc: {
    name: "BBC",
    title: "Luis Rubiales given Spanish restraining order over World Cup kiss",
    url: 'https://www.bbc.com/news/world-europe-66818691.amp'
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
  addEventListenerList(renderedWords, 'dragstart', onDragStart);

  dropzoneDiv.addEventListener('dragover', onDragOver);
  dropzoneDiv.addEventListener('drop', onDrop);

  ctaCheckElem.addEventListener('click', checkTitle)
  ctaReveal.addEventListener('click', revealTitle)


}



init()
