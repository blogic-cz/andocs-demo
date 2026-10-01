# Stateful prototypes

This client database uses Evolu through the Andocs data API. The table starts empty. Add, edit, or delete a client, then refresh the page to see the locally saved records. Live subscriptions update the table when stored records change.

```prototype path=prototype-demo/pages/stateful-clients.html title="Stateful Client Database" height=800

```

Only `prototype-demo/pages/prototype.json` declares data. The Counter, Client Dashboard, Web Components, and Team Dashboard pages live in `prototype-demo/stateless/` under the original configuration without a data declaration.

The Client database keeps its original HTML path so the trusted Andocs host can find its previous save. Before opening the database, the page registers a pure version 1 mapper for the old `{ version: 1, clients: [...] }` snapshot. It validates every client and maps each legacy ID into the `clients` collection. The three retired sample IDs, `sample-1`, `sample-2`, and `sample-3`, are excluded, as they were in the previous demo. No samples are seeded.

```js
window.andocsData.registerMigration(1, migrateClients);
await window.andocsData.ready;

const records = await window.andocsData.list("clients");
const stop = window.andocsData.subscribe("clients", renderRecords);

await window.andocsData.create("clients", {
  name: "Ada", company: "Example", email: "ada@example.com",
  status: "prospect", notes: "",
});
```

The trusted host selects the legacy source and performs the import. The original save is preserved. A durable migration ledger prevents reloads from importing the same records again or replacing later edits and deletions. The page cannot edit records until migration succeeds. An invalid save or unavailable data host leaves editing disabled and shows a reload instruction.

Each add, edit, or delete waits for local storage confirmation. A failed or uncertain write keeps editing disabled until reload so a repeated click cannot create a duplicate. The relay status describes the database connection; it does not confirm that a particular save reached the relay.

Standalone OpenDesign and Andocs use separate local identities on their respective origins. Opening this HTML in OpenDesign does not import the Andocs save or make the two views share records. Standalone editing requires the trusted data host provided by a compatible Andocs CLI and its OpenDesign preview integration.
