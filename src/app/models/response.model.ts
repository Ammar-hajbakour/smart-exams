export class Response {
    id!: string

    constructor(public userId: string, public subjectId: string) { }

    answers!: { id: string, value: unknown }[]

    result!: number
    status: 'started' | 'finished' = 'started'
    startTime: number = Date.now()
    endTime!: number
}