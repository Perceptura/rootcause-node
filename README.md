# @rootcause/sdk

Official TypeScript/JavaScript SDK for the [RootCause](https://rootcause.ai) platform API.

## Installation

```bash
npm install @rootcause/sdk
```

## Quick Start

```typescript
import { RootCause } from '@rootcause/sdk'

const rc = new RootCause({
  apiKey: 'pk_your_api_key',
  workspaceId: 'ws_your_workspace',
})

// List datasets
const { data } = await rc.datasets.list()

// Get a specific dataset's schema
const { data: schema } = await rc.datasets.schema('dataset_id')

// Run a simulation
const { data: sim } = await rc.simulations.run({
  digitalTwinVersionId: 'dtv_123',
  interventions: { price: 120 },
})
```

## Features

- Fully typed — generated from the RootCause OpenAPI spec
- Workspace-scoped — set a default workspace or pass one per call
- Job polling — built-in helpers for long-running operations
- Auto-pagination — async iterators for paginated endpoints
- Tree-shakeable — only import what you use

## Configuration

```typescript
const rc = new RootCause({
  apiKey: 'pk_...',
  baseUrl: 'https://platform.rootcause.ai',  // default
  workspaceId: 'ws_...',                      // optional default
})
```

## Job Polling

```typescript
import { RootCause, pollJob } from '@rootcause/sdk'

const rc = new RootCause({ apiKey: 'pk_...', workspaceId: 'ws_...' })

// Start a causal discovery job
const { data: job } = await rc.digitalTwins.create({ ... })

// Poll until complete
const result = await pollJob(
  () => rc.jobs.get(job.jobId).then(r => r.data),
  {
    intervalMs: 3000,
    timeoutMs: 600_000,
    onProgress: (j) => console.log(`${j.status} ${j.progress ?? 0}%`),
  }
)
```

## License

MIT
