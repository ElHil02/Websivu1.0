//Eelis Hiltunen
//Mallia katsottu netistä https://dev.to/sulaimonolaniran/building-a-simple-quiz-with-html-css-and-javascript-4elp
//Kysymyksiä etsitty mm. https://peda.net/opetussuunnitelma/ksops/viitasaari2/luku14/14-4_oppiaineet/14-4-8_historia/5/hsv5
const questions = [
    {
        question: "Milloin korkeakulttuurit alkoivat muodostumaan",
        optionA: "noion 3000 vuotta sitten",
        optionB: "noin 5000 vuotta sitten",
        optionC: "noin 7000 vuotta sitten",
        optionD: "noin 9000 vuotta sitten",
        correctOption: "optionB"
    },

    {
        question: "Mitä aluetta Faaraot hallitsivat?",
        optionA: "Suomea",
        optionB: "Kiinaa",
        optionC: "Egyptiä",
        optionD: "Irania",
        correctOption: "optionC"
    },

    {
        question: "Keitä veljeksiä voidaan pitää Rooman perustajina?",
        optionA: "Reemus ja Roomulus",
        optionB: "Rellu ja Rollu",
        optionC: "Romulus ja Remus",
        optionD: "Ron ja Rom",
        correctOption: "optionC"
    },

    {
        question: "Minä vuonna Rooma jakaantui?",
        optionA: "420.jaa",
        optionB: "395.jaa",
        optionC: "300.jaa",
        optionD: "295.jaa",
        correctOption: "optionB"
    },

    {
        question: "Minkä nimisenä Itä-Rooma tunnettiin Rooman jakautumisen jälkeen?",
        optionA: "Byzantium",
        optionB: "Ottomaanien valtakunta",
        optionC: "Pyhä saksalais-roomalainen keisarikunta",
        optionD: "Rooma",
        correctOption: "optionA"
    },

    {
        question: "Mikä on feodalismi ?",
        optionA: "Yhteiskuntajärjestelmä",
        optionB: "Uskonto",
        optionC: "Filosofinen termi",
        optionD: "Kieli",
        correctOption: "optionA"
    },

    {
        question: "Milloin voidaan katsoa Suomen historiallisen ajanjakson alkaneen ?",
        optionA: "1.jaa",
        optionB: "100",
        optionC: "1000",
        optionD: "1100",
        correctOption: "optionD"
    },

    {
        question: "Kuka löysi Amerikan ?",
        optionA: "Vasco da Gama",
        optionB: "Henrik Purjehtija",
        optionC: "Kristoffer Kolumbus",
        optionD: "Bartolomeu Dias",
        correctOption: "optionC"
    },

    {
        question: "Euroopassa alkoi reformaatio _____-luvulla ?",
        optionA: "1200",
        optionB: "1999",
        optionC: "2000",
        optionD: "1500",
        correctOption: "optionD"
    },

    {
        question: `"You Can't see me" is a popular saying by`,
        optionA: "Eminem",
        optionB: "Bill Gates",
        optionC: "Chris Brown",
        optionD: "John Cena",
        correctOption: "optionD"
    },

]


let shuffledQuestions = [] 
function handleQuestions() { 
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0 

function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber]  
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++  
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}




function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function handleEndGame() {
    let remark = null
    let remarkColor = null

    if (playerScore <= 3) {
        remark = "Jatka harjoittelua ja yritä uudestaan.."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Pystyt varmasti parempaan."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Loistavaa, jatka samaa mallia."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}