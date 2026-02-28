import { RootCauseTimeoutError } from './errors'

export type JobStatus = {
  id: string
  status: string
  progress?: number
  result?: unknown
  error?: string
}

type PollOptions = {
  intervalMs?: number
  timeoutMs?: number
  onProgress?: (job: JobStatus) => void
}

export const pollJob = async (
  fetchJob: () => Promise<JobStatus>,
  options: PollOptions = {}
): Promise<JobStatus> => {
  const { intervalMs = 2000, timeoutMs = 300_000, onProgress } = options
  const start = Date.now()

  while (true) {
    const job = await fetchJob()

    if (onProgress) onProgress(job)

    if (job.status === 'completed' || job.status === 'failed' || job.status === 'cancelled') {
      return job
    }

    if (Date.now() - start > timeoutMs) {
      throw new RootCauseTimeoutError(job.id, timeoutMs)
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs))
  }
}
