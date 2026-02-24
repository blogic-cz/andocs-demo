# Code Blocks

Andocs highlights code blocks using the `@streamdown/code` plugin. Specify the language after the opening triple backticks.

## TypeScript

```typescript
import { Effect, Layer } from "effect";

const program = Effect.gen(function* () {
  const config = yield* ConfigService;
  yield* Effect.log(`Starting on port ${config.port}`);
  return yield* HttpServer.start(config);
});

const MainLive = Layer.mergeAll(ConfigLive, HttpServerLive);

Effect.runPromise(program.pipe(Effect.provide(MainLive)));
```

## Python

```python
from dataclasses import dataclass
from typing import Optional

@dataclass
class Document:
    title: str
    content: str
    tags: list[str]
    parent: Optional["Document"] = None

    def word_count(self) -> int:
        return len(self.content.split())
```

## SQL

```sql
SELECT
  p.name AS project,
  COUNT(d.id) AS documents,
  MAX(d.updated_at) AS last_update
FROM projects p
LEFT JOIN documents d ON d.project_id = p.id
WHERE p.organization_id = 'org_123'
GROUP BY p.name
ORDER BY last_update DESC;
```

## YAML

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    spec:
      containers:
        - name: app
          image: registry.example.com/web-app:latest
          ports:
            - containerPort: 3000
```

## Shell

```bash
# Clone and start
git clone https://github.com/your-org/docs.git
cd docs
bun install
bun run dev
```

## Inline Code

Use single backticks for inline code: `const x = 42;`. Inline code gets a subtle background highlight to stand out from surrounding text.
