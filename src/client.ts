import { createClient, createConfig } from './generated/client'
import type { ClientOptions } from './generated/client'
import * as sdk from './generated/sdk.gen'

export type RootCauseConfig = {
  apiKey: string
  baseUrl?: string
  workspaceId?: string
}

export type { JobStatus } from './jobs'
export type { PaginatedResponse } from './pagination'

export class RootCause {
  private _client: ReturnType<typeof createClient>
  private _workspaceId?: string

  constructor(config: RootCauseConfig) {
    this._workspaceId = config.workspaceId
    this._client = createClient(
      createConfig<ClientOptions>({
        baseUrl: config.baseUrl ?? 'https://platform.rootcause.ai',
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
      })
    )
  }

  get workspaceId(): string | undefined {
    return this._workspaceId
  }

  set workspaceId(id: string | undefined) {
    this._workspaceId = id
  }

  private wsId(override?: string): string {
    const id = override ?? this._workspaceId
    if (!id) throw new Error('workspaceId is required. Set it on the client or pass it explicitly.')
    return id
  }

  workspaces = {
    list: () => sdk.getApiV1Workspaces({ client: this._client }),
    get: (id: string) => sdk.getApiV1WorkspacesWsId({ client: this._client, path: { wsId: id } }),
    create: (body: Record<string, unknown>) => sdk.postApiV1Workspaces({ client: this._client, body } as unknown as Parameters<typeof sdk.postApiV1Workspaces>[0]),
    update: (id: string, body: Record<string, unknown>) => sdk.patchApiV1WorkspacesWsId({ client: this._client, path: { wsId: id }, body } as unknown as Parameters<typeof sdk.patchApiV1WorkspacesWsId>[0]),
    delete: (id: string) => sdk.deleteApiV1WorkspacesWsId({ client: this._client, path: { wsId: id } }),
  }

  datasets = {
    list: (wsId?: string) => sdk.getApiV1WorkspacesWsIdDatasets({ client: this._client, path: { wsId: this.wsId(wsId) } }),
    get: (id: string, wsId?: string) => sdk.getApiV1WorkspacesWsIdDatasetsId({ client: this._client, path: { wsId: this.wsId(wsId), id } }),
    create: (body: Record<string, unknown>, wsId?: string) => sdk.postApiV1WorkspacesWsIdDatasets({ client: this._client, path: { wsId: this.wsId(wsId) }, body } as unknown as Parameters<typeof sdk.postApiV1WorkspacesWsIdDatasets>[0]),
    update: (id: string, body: Record<string, unknown>, wsId?: string) => sdk.patchApiV1WorkspacesWsIdDatasetsId({ client: this._client, path: { wsId: this.wsId(wsId), id }, body } as unknown as Parameters<typeof sdk.patchApiV1WorkspacesWsIdDatasetsId>[0]),
    delete: (id: string, wsId?: string) => sdk.deleteApiV1WorkspacesWsIdDatasetsId({ client: this._client, path: { wsId: this.wsId(wsId), id } }),
    schema: (id: string, wsId?: string) => sdk.getApiV1WorkspacesWsIdDatasetsIdSchema({ client: this._client, path: { wsId: this.wsId(wsId), id } }),
    records: (id: string, wsId?: string) => sdk.getApiV1WorkspacesWsIdDatasetsIdRecords({ client: this._client, path: { wsId: this.wsId(wsId), id } }),
  }

  dataViews = {
    list: (wsId?: string) => sdk.getApiV1WorkspacesWsIdDataViews({ client: this._client, path: { wsId: this.wsId(wsId) } }),
    get: (id: string, wsId?: string) => sdk.getApiV1WorkspacesWsIdDataViewsId({ client: this._client, path: { wsId: this.wsId(wsId), id } }),
    create: (body: Record<string, unknown>, wsId?: string) => sdk.postApiV1WorkspacesWsIdDataViews({ client: this._client, path: { wsId: this.wsId(wsId) }, body } as unknown as Parameters<typeof sdk.postApiV1WorkspacesWsIdDataViews>[0]),
    update: (id: string, body: Record<string, unknown>, wsId?: string) => sdk.patchApiV1WorkspacesWsIdDataViewsId({ client: this._client, path: { wsId: this.wsId(wsId), id }, body } as unknown as Parameters<typeof sdk.patchApiV1WorkspacesWsIdDataViewsId>[0]),
    delete: (id: string, wsId?: string) => sdk.deleteApiV1WorkspacesWsIdDataViewsId({ client: this._client, path: { wsId: this.wsId(wsId), id } }),
  }

  ontology = {
    concepts: (wsId?: string) => sdk.getApiV1WorkspacesWsIdOntologyConcepts({ client: this._client, path: { wsId: this.wsId(wsId) } }),
    graph: (wsId?: string) => sdk.getApiV1WorkspacesWsIdOntologyGraph({ client: this._client, path: { wsId: this.wsId(wsId) } }),
  }

  digitalTwins = {
    list: (wsId?: string) => sdk.getApiV1WorkspacesWsIdDigitalTwins({ client: this._client, path: { wsId: this.wsId(wsId) } }),
    get: (id: string, wsId?: string) => sdk.getApiV1WorkspacesWsIdDigitalTwinsId({ client: this._client, path: { wsId: this.wsId(wsId), id } }),
    create: (body: Record<string, unknown>, wsId?: string) => sdk.postApiV1WorkspacesWsIdDigitalTwins({ client: this._client, path: { wsId: this.wsId(wsId) }, body } as unknown as Parameters<typeof sdk.postApiV1WorkspacesWsIdDigitalTwins>[0]),
  }

  jobs = {
    list: (wsId?: string) => sdk.getApiV1WorkspacesWsIdJobs({ client: this._client, path: { wsId: this.wsId(wsId) } }),
    get: (id: string, wsId?: string) => sdk.getApiV1WorkspacesWsIdJobsId({ client: this._client, path: { wsId: this.wsId(wsId), id } }),
    cancel: (id: string, wsId?: string) => sdk.postApiV1WorkspacesWsIdJobsIdCancel({ client: this._client, path: { wsId: this.wsId(wsId), id } }),
  }

  simulations = {
    run: (body: Record<string, unknown>, wsId?: string) => sdk.postApiV1WorkspacesWsIdSimulations({ client: this._client, path: { wsId: this.wsId(wsId) }, body } as unknown as Parameters<typeof sdk.postApiV1WorkspacesWsIdSimulations>[0]),
    get: (id: string, wsId?: string) => sdk.getApiV1WorkspacesWsIdSimulationsId({ client: this._client, path: { wsId: this.wsId(wsId), id } }),
    results: (id: string, wsId?: string) => sdk.getApiV1WorkspacesWsIdSimulationsIdResults({ client: this._client, path: { wsId: this.wsId(wsId), id } }),
  }

  reports = {
    list: (wsId?: string) => sdk.getApiV1WorkspacesWsIdReports({ client: this._client, path: { wsId: this.wsId(wsId) } }),
    get: (id: string, wsId?: string) => sdk.getApiV1WorkspacesWsIdReportsId({ client: this._client, path: { wsId: this.wsId(wsId), id } }),
    create: (body: Record<string, unknown>, wsId?: string) => sdk.postApiV1WorkspacesWsIdReports({ client: this._client, path: { wsId: this.wsId(wsId) }, body } as unknown as Parameters<typeof sdk.postApiV1WorkspacesWsIdReports>[0]),
    generate: (id: string, body: Record<string, unknown>, wsId?: string) => sdk.postApiV1WorkspacesWsIdReportsIdGenerate({ client: this._client, path: { wsId: this.wsId(wsId), id }, body } as unknown as Parameters<typeof sdk.postApiV1WorkspacesWsIdReportsIdGenerate>[0]),
  }

  agent = {
    chat: (body: Record<string, unknown>, wsId?: string) => sdk.postApiV1WorkspacesWsIdAgentChat({ client: this._client, path: { wsId: this.wsId(wsId) }, body } as unknown as Parameters<typeof sdk.postApiV1WorkspacesWsIdAgentChat>[0]),
    tools: (wsId?: string) => sdk.getApiV1WorkspacesWsIdAgentTools({ client: this._client, path: { wsId: this.wsId(wsId) } }),
    sessions: (wsId?: string) => sdk.getApiV1WorkspacesWsIdAgentSessions({ client: this._client, path: { wsId: this.wsId(wsId) } }),
  }
}
