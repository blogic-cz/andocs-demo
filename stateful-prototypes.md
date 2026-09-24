# Stateful Prototypes

This client database demonstrates browser-local JSON persistence in an Andocs prototype. The table starts empty. Add, edit, or delete a client, then refresh the page to see the automatically saved records.

```prototype path=prototype-demo/pages/stateful-clients.html title="Stateful Client Database" height=800

```

The prototype uses `window.andocsState.load()` to read a JSON value and `window.andocsState.save(value)` to write it. Andocs scopes the value to the authenticated user, project, repository, and prototype path in this browser. It does not sync to a server or another browser. If the state bridge is unavailable, the page still supports CRUD for the current view and explains that a refresh will reset it.

```js
const saved = await window.andocsState.load();
if (saved !== null) clients = saved.clients;

await window.andocsState.save({ version: 1, clients });
```

The page validates saved records before restoring them and removes the three old sample records from existing saves. Changes save automatically after each add, edit, or delete. If saving fails, the current records remain visible and a **Retry save** button appears. Its **Add client** button handles clicks directly because the sandboxed prototype iframe allows scripts but does not allow native form submission.
