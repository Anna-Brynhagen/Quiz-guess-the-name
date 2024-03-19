const imgDisplay = document.querySelector("#img");
//answerBtnWrapper wrappes all btns
const btnContainer = document.querySelector("#answerBtnWrapper");
//playBtn is our next button.
const playBtn = document.querySelector("#playBtn");
//h2 containing score result
const result = document.querySelector("#scoreResult");
//h1 rubrik
const h1 = document.querySelector("#h1");
//använder inte nedan
const optContainer = document.querySelector("#indexQContainer");
const fiveQ = document.querySelector("#fiveQ");
const tenQ = document.querySelector("#tenQ");
const twentyQ = document.querySelector("#twentyQ");
const allQ = document.querySelector("#allQ");

// Function shuffels array without changing original
const shuffleArray = (students) => {
    // create copy using slice array method
    const shuffledArray = students.slice();
    // shuffels array
    return shuffledArray.sort(() => Math.random() - 0.5);
}

//variabel created for my mixed array
const mixedArray = shuffleArray(students);

let currentQIndex = 0;
let score = 0;
let choosenIndex = 0;

//hide cute kitten
imgDisplay.style.display = "none";

// event listners to start quiz on specifik number.
fiveQ.addEventListener("click", () => startQuiz(5));
tenQ.addEventListener("click", () => startQuiz(10));
twentyQ.addEventListener("click",() => startQuiz(20));
allQ.addEventListener("click", () => startQuiz(mixedArray.length));

//function to start quiz
function startQuiz(amountQ) {
    // hide "Play Again" button
    playBtn.style.display = "none";
    // show buttons with names container
    btnContainer.style.display = "flex";
    //hide game options
    indexQContainer.style.display = "none";
    //set amout of questions choice through choosenIndex
    choosenIndex = amountQ;
    //show image 
    imgDisplay.style.display = "block";
    h1.innerText = "Guess The Name";
    showQuestion();
}


// Function to handle answer alternetives
function showQuestion() {
    // Clear content 
    btnContainer.innerHTML = '';
    // Collect the current question from the shuffled array
    const currentQuestion = mixedArray[currentQIndex];
    currentQIndex++;// forgot to add this... after staring at my code for two hours
    // takes the currentQuestion and uses its image
    imgDisplay.setAttribute("src", currentQuestion.image);
    // Create variabel for names and add correct name
    let correctName = [currentQuestion.name];
    // Add three shffled names from mixedArray
    while (correctName.length < 4) {
        const shuffledArray = shuffleArray(mixedArray);
        //get the first name from shuffeledArray
        const randomPerson = shuffledArray[0];
        // if the name does not exsist add a shuffled name
        if (!correctName.includes(randomPerson.name)) {
            correctName.push(randomPerson.name);
        }
    }
    // Shuffel names so that correct name is not always first ⭐️
    const shuffledNames = shuffleArray(correctName);

    // Create button for every name in correctName
    shuffledNames.forEach(name => {
        const button = document.createElement("button");
        button.innerHTML = name;
        button.classList.add("btn");
        btnContainer.appendChild(button);
        // Set the property isCorrect based on whether the name is the correct answer or not
        //isCorrect is an object property and is a boolean, in this case, true
        button.isCorrect = name === currentQuestion.name;
        // addeventlistner to check correct answer and add class for styling
        button.addEventListener("click", () => {
            if (button.isCorrect) {
                button.classList.add("correct");
                score++;
            } else {
                button.classList.add("inCorrect");
                //find the correct btn to show user correct name
                const correctButton = [...btnContainer.children]
                .find((btn) => btn.isCorrect);
                correctButton.classList.add("correct");
            }
            // setTimeOut so user can see the correct/inCorrect colors before next question
            setTimeout(() => selectAnswer(), 500);
        });
    });
}

function selectAnswer() {
    //show next question or stop
    if (currentQIndex < choosenIndex) {
        showQuestion();
    } else {
        showResult();
    }
}

//Add section for showing result
function showResult() {
    //hide elements
    imgDisplay.style.display = "none";
    //imgDisplay.src = "";
    btnContainer.style.display = "none";
    //bring back play again btn
    playBtn.style.display = "block"
    playBtn.innerHTML = "Play Again!"
    //change text in h1
    h1.innerHTML = "Your Result!"
    //add score result
    if (currentQIndex <= 5){
        result.textContent = `You scored ${score} out of 5`;
      } else if (currentQIndex <= 10) {
        result.textContent = `You scored ${score} out of 10`;
      } else if(currentQIndex <= 20) {
        result.textContent = `You scored ${score} out of 20`;
      } else {
        result.textContent = `You scored ${score} out of ${mixedArray.length}`;
      }
      //brings me back to start
      playBtn.addEventListener("click", () => location.reload());
}


//add section for reset quiz



/* 
Skapa variabler för att hålla reda på antalet rätt och fel svar.⭐️
Implementera en funktion för att blanda personerna i arrayen och för att variera namnen varje gång.⭐️
Implementera en funktion för att generera en ny bild och svarsalternativ baserat på den blandade arrayen.⭐️
Implementera en funktion för att visa resultatet och uppdatera räkning för rätt och fel svar.⭐️
Implementera svarsalternativ och visa resultatet.*/


