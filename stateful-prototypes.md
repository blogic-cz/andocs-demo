# Stateful prototypes

This client database uses a named Andocs-managed dataset through the Andocs data API. Choose the same dataset in Andocs and in the OpenDesign preview to see the same records. The table starts empty. Add, edit, or delete a client, then refresh to see the saved records. Live subscriptions update the table when stored records change.

```prototype path=prototype-demo/pages/stateful-clients.html title="Stateful Client Database" height=800

```

Only `prototype-demo/pages/prototype.json` declares data. The Counter, Client Dashboard, Web Components, and Team Dashboard pages live in `prototype-demo/stateless/` under the original configuration without a data declaration.

The dataset is shared through the configured Evolu relay. Each origin keeps its own local copy, so offline edits can sync when that origin reconnects. Select the same named dataset in both host views; separate datasets remain independent. Public sharing uses a pinned shared dataset and a share link.

The page uses the declared `clients` collection through `window.andocsData`:

```js
const data = window.andocsData;
await data.ready;

const records = await data.list("clients");
const stop = data.subscribe("clients", renderRecords);

await data.create("clients", {
  name: "Ada", company: "Example", email: "ada@example.com",
  status: "prospect", notes: "",
});
```

The page declares a mapper for the old browser snapshot format, but the managed data host does not select a legacy source or automatically import old browser data. OpenDesign uses the named dataset selected by Andocs CLI 2.2.6 or later. The CLI shares the dataset through the relay; this demo does not run its own backend. Each add, edit, or delete waits for local storage confirmation. The relay status describes the database connection; it does not confirm that a particular save reached the relay.
