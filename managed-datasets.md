# Managed Dataset Todo Demo

This guide uses a Todo prototype and a separate task overview. Both declare the `tasks` collection with project scope, so they can show the same records when opened in the same Andocs project and selected dataset.

The hosted catalog follows the signed-in account across devices. Andocs keeps dataset keys in encrypted custody and sends them only to its trusted host; Todo HTML never sees keys or account controls. The anonymous CLI catalog is local to that machine and separate from hosted account datasets.

## Try the prototypes

```prototype path=prototype-demo/pages/todo.html title="Team Todo" height=800

```

```prototype path=prototype-demo/task-overview/pages/index.html title="Task Overview" height=600

```

## Create and switch datasets

1. Open **Team Todo** in the internal Andocs project view and open its database control.
2. If the control finds old browser data, preview and explicitly adopt it into a named personal dataset. Confirm the old source remains intact. If there is no old data, the first open creates the empty **My data** default unless a global default applies.
3. Create a named personal dataset with **New dataset**. It starts empty. Add two tasks, then open **Task Overview** to see the same tasks.
4. An authorized project administrator can set a global default. Switch to it and verify its tasks stay independent from personal datasets.
5. Create another personal dataset with **New dataset**. It starts empty. Switch back to the first dataset to see its tasks unchanged. Fork that dataset into a new named dataset, rename the fork, edit a task, and switch back to confirm the source is unchanged.
6. Sign in to the same account on a second browser or device, open this project, and select the same dataset. Confirm both views show the same task records.

## Share collaborative work

1. In **Team Todo**, open the prototype share dialog and pin a named shared dataset. Publishing from personal or global data creates a separate fork; keep or change the suggested `shared-` name. Selecting an existing shared dataset reuses its records.
2. Open the share URL in two separate browser profiles. Visitors can add, edit, complete, and delete tasks, but do not get dataset controls even if that browser is signed in.
3. Confirm the internal author view, **Task Overview**, and both external clients converge on the same shared task list. Confirm the personal and global source datasets retain their original tasks.
4. Publish another link to the existing shared dataset and confirm its client-added tasks remain. Set a password and expiry on a disposable link, then revoke it; another active link to the same dataset still works and the author retains the tasks.
5. Back in the internal view, fork the current shared dataset into a newly named personal dataset. Edit each dataset in turn and confirm the personal source, shared source, and new fork remain independent.

## OpenDesign handoff

1. In the CLI host, create/select a named dataset, add recognizable marker tasks, then choose **Edit in OpenDesign**. This uses the CLI's anonymous local catalog; it is separate from the hosted account catalog.
2. In OpenDesign, edit a task and save a source-file change. Confirm the task appears in the CLI view and the HTML source change returns to the repository.
3. Select a different CLI dataset. The existing OpenDesign view remains on its handed-off dataset. Choose **Edit in OpenDesign** again to hand off the newly selected dataset.

The Todo page uses only `window.andocsData` and the declared `tasks` collection. Dataset selection, naming, sharing, and fork controls stay in trusted host UIs; they are not exposed to prototype HTML. Dataset identities are never implicitly merged across hosted, local CLI, browser-origin, or historical OpenDesign storage.
