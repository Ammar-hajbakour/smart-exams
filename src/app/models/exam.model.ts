export type PointsCalculationStrategy = 'count-only-correct-answers' | 'count-all'

export class Exam {
    id!: string
    image!: { name: string, url: string }
    constructor(public instructorId: string, public name: string) { }
    instructor!: string
    description!: string
    shortDescription!: string
    questions: Question[] = []
    category: string = ''
    duration: number = 120
    passDegreePercentage: number = 60
    correctAnswers: { [questionId: string]: (string | number)[] } = {}
    status: 'building' | 'review' | 'published' | 'archived' = 'building'
    level: 'basic' | 'medium' | 'advanced' = 'basic'
    answerInstructions!: string
    calcStrategy!: PointsCalculationStrategy
    normalizeName!: string

    shuffle: boolean = false
    show1by1: boolean = false
}

export class Question {
    id: number = Date.now()
    text: string = '';
    choices: { display: string, value: string | number }[] = []
    shuffleChoices: boolean = false
    points = 1

    // in collector allow user to select as many as allowedChoices ?? question.choices.length
    allowedChoices: number | null = null

    calcStrategy!: PointsCalculationStrategy
}


// Instructor should answer each exam with the correct answers
// Compare answers of any student response with the correct answer