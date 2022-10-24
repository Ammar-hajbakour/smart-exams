export class ExamResponse {
    id!: string

    constructor(public userId: string, public examId: string) { }

    answers: { [questionId: string]: (string | number)[] } = {}

    result: number = 0
    status: 'started' | 'finished' = 'started'
    startTime: number = Date.now()
    endTime: number | null = null
}