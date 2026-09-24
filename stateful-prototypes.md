# Stateful Prototypes

This client database demonstrates browser-local JSON persistence in an Andocs prototype. Add, edit, or delete a client, then click **Save** and refresh the page to see the saved records. The page starts with three sample clients when no saved value exists.

```prototype path=prototype-demo/pages/stateful-clients.html title="Stateful Client Database" height=800

```

**Reset sample data** replaces the records currently shown. Click **Save** afterward to keep that reset after a refresh.

The prototype uses `window.andocsState.load()` to read a JSON value and `window.andocsState.save(value)` to write it. Andocs scopes the value to the authenticated user, project, repository, and prototype path in this browser. It does not sync to a server or another browser. If the state bridge is unavailable, the page still supports CRUD for the current view and explains that a refresh will reset it.

```js
const saved = await window.andocsState.load();
if (saved !== null) clients = saved.clients;

await window.andocsState.save({ version: 1, clients });
```

The page validates saved records before restoring them. Load and save errors leave the current records visible so you can retry. Its **Add client** button handles clicks directly because the sandboxed prototype iframe allows scripts but does not allow native form submission.
