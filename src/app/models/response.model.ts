export class ExamResponse {
    id!: string

    instructor!: string
    examName!: string
    normalizeName!: string
    userName!: string
    constructor(public userId: string, public examId: string, instructorId: string) { }

    answers: { [questionId: string]: (string | number)[] } = {}

    status: 'started' | 'finished' = 'started'
    startTime: number | null = null
    endTime: number | null = null

    result: number = 0
    isPassed!: boolean
    passDegreePercentage!: number
}