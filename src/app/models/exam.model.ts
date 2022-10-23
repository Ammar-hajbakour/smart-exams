export class Exam {
    id!: string
    constructor(public instructorId: string, public name: string) { }
    questions: Question[] = []
    category: string = ''
    duration: number = 120
    passDegreePercentage: number = 60

    status: 'building' | 'review' | 'published' | 'archived' = 'building'
}

export class Question {
    id: number = Date.now()
    text!: string;
    choices: { display: string, value: string | number }[] = []
    points = 1
    isSingleChoice: boolean = true // do not implement this
}


// Instructor should answer each exam with the correct answers
// Compare answers of any student response with the correct answer