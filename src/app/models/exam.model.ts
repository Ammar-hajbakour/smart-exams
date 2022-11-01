export class Exam {
    id!: string
    image!: { name: string, url: string }
    constructor(public instructorId: string, public name: string) { }
    instructorName!: string
    description!: string
    questions: Question[] = []
    category: string = ''
    duration: number = 120
    passDegreePercentage: number = 60
    correctAnswers: { [questionId: string]: (string | number)[] } = {}
    status: 'building' | 'review' | 'published' | 'archived' = 'building'
    level: 'basic' | 'medium' | 'advanced' = 'basic'
    answerInstructions!: string

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