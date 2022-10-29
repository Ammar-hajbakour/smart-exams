export class Exam {
    id!: string
    constructor(public instructorId: string, public name: string) { }
    questions: Question[] = []
    category: string = ''
    duration: number = 120
    passDegreePercentage: number = 60
    correctAnswers: string[] = []
    status: 'building' | 'review' | 'published' | 'archived' = 'building'

    answerInstructions!:string

    shuffle: boolean = false
    show1by1: boolean = false
}

export class Question {
    id: number = Date.now()
    text: string = '';
    choices: { display: string, value: string | number }[] = []
    shuffleChoices: boolean = false
    points = 1
    isSingleChoice?: boolean = true // do not implement this
}


// Instructor should answer each exam with the correct answers
// Compare answers of any student response with the correct answer