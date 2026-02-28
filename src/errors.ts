export class RootCauseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RootCauseError'
  }
}

export class RootCauseApiError extends RootCauseError {
  status: number
  type: string
  detail: string
  instance?: string

  constructor(problem: { status: number, type: string, title: string, detail: string, instance?: string }) {
    super(`${problem.title}: ${problem.detail}`)
    this.name = 'RootCauseApiError'
    this.status = problem.status
    this.type = problem.type
    this.detail = problem.detail
    this.instance = problem.instance
  }
}

export class RootCauseTimeoutError extends RootCauseError {
  jobId: string

  constructor(jobId: string, timeoutMs: number) {
    super(`Job ${jobId} did not complete within ${timeoutMs}ms`)
    this.name = 'RootCauseTimeoutError'
    this.jobId = jobId
  }
}
