# Mermaid Diagrams

Andocs renders Mermaid diagrams automatically from ` ```mermaid ` code blocks. Diagrams support zoom, pan, and fullscreen view.

## Flowchart

```mermaid
flowchart TD
    A[Push to main] --> B{Tests pass?}
    B -->|Yes| C[Build Docker image]
    B -->|No| D[Notify team]
    C --> E[Deploy to staging]
    E --> F{Manual approval}
    F -->|Approved| G[Deploy to production]
    F -->|Rejected| D
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant App
    participant API
    participant DB

    User->>App: Open document
    App->>API: GET /documents/:id
    API->>DB: SELECT * FROM documents
    DB-->>API: Document row
    API-->>App: JSON response
    App-->>User: Rendered markdown
```

## Entity-Relationship Diagram

```mermaid
erDiagram
    ORGANIZATION ||--o{ PROJECT : has
    ORGANIZATION ||--o{ MEMBER : has
    PROJECT ||--o{ REPOSITORY : contains
    REPOSITORY ||--o{ DOCUMENT : stores
    MEMBER }o--o{ PROJECT : "has access to"
    DOCUMENT ||--o{ COMMENT : has
```

## Pie Chart

```mermaid
pie title Document Types
    "Markdown" : 65
    "MDX" : 20
    "HTML Preview" : 10
    "Other" : 5
```

## Git Graph

```mermaid
gitGraph
    commit
    commit
    branch feature/auth
    commit
    commit
    checkout main
    merge feature/auth
    commit
    branch fix/typo
    commit
    checkout main
    merge fix/typo
```

## Tips

- Diagrams auto-detect dark/light theme
- Use the fullscreen button for complex diagrams
- Zoom in/out with the controls that appear on hover
