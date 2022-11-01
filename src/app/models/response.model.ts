export class ExamResponse {
    id!: string

    instructor!: string
    constructor(public userId: string, public examId: string, instructorId: string) { }

    answers: { [questionId: string]: (string | number)[] } = {}

    result: number = 0
    status: 'started' | 'finished' = 'started'
    startTime: number | null = null
    endTime: number | null = null
}