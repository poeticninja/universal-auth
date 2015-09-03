# Universal Auth

Universal Auth to be used when rendering on the server or client.

## Goal

To provide a simple, consistent, and dynamic auth library that can be used by any front-end framework to render on the server or client.

## Installation

```
$ npm install --save universal-auth
```

## Example

```javascript
var Auth = require('universal-auth');

// Create new auth object
var auth = Auth();

// User to be used for the session.
var user = {
    name: 'John Doe',
    scope: ['user', 'user-123']
};

// Sets the user as the session.
auth.session.set(user);

// Gets the users session.
auth.sesson.get(); // { name: 'John Doe', scope: ['user', 'user-123'] }

// Checks if the session has been set.
auth.isAuthenticated(); // true

// Checks if the session has the scope user.
auth.isAuthorized('user'); // true

// Checks if the session has the scope admin.
auth.isAuthorized('admin'); // false

// Checks if the session has the scope admin or user. Typically used for role based authorization.
auth.isAuthorized(['admin', 'user']); // true

// This is typically provided by a router location.
var routerLocation = {
    params: {
        id: 123
    }
};
/**
 * Dynamic check with the router to see if the session scope has admin
 * or
 * based on the router params id if the session scope has 'user-123'.
 */  
auth.isAuthorized(['admin', 'user-{params.id}'], routerLocation); // true

// Clears the session
auth.session.clear();
```

## API

## `Auth()`
Creates a new auth object that is used for the user and their session.
```
var auth = Auth();
```

### `auth.session.set(session)`

Sets the users session in the auth object. If in a browser it will also set the session in `localStorage` so the session is retained when your app is reloaded by the browser.

_To use `auth.session.isAuthorized` you will need to have a scope property on the session object._

### `auth.session.get()`

Returns the current user session from the auth object or null. In the browser if the session is not found it will check `localStorage`.

### `auth.session.clear()`

Clears the user session from the auth object. If in the browser it will also clear the session from `localStorage`.

### `auth.isAuthenticated()`

Returns `true` or `false` based on if the user session has been set. If in the browser it will also check `localStorage`.

### `auth.isAuthorized(scope, [templateObj])`

Returns `true` or `false` based on if the users session scope matches the passed in `scope`. This is great for role based authorization.

If no scope, null, or false is passed in then an automatic true will be returned.

```javascript
// User to be used for the session
var user = {
    name: 'John Doe',
    scope: 'user'
};

auth.isAuthorized(); // true
auth.isAuthorized(false); // true
auth.isAuthorized(true); // false

// Sets the user as the session.
auth.session.set(user);
auth.isAuthorized(true); // true
auth.isAuthorized('user'); // true
auth.isAuthorized('admin'); // false
auth.isAuthorized(['admin', 'user']); // true
```

You are also able to have dynamic authorization based on an object you pass as a second parameter. It will be used to fill in the scope template.

_This is great for router based auth. Maybe you only want an item available if its the actual users profile and that is known based on the router params._

```javascript
// User to be used for the session
var user = {
    name: 'John Doe',
    scope: ['user', 'user-123']
};

// Sets the user as the session.
auth.session.set(user);

auth.isAuthorized('user'); // true
auth.isAuthorized('admin'); // false
auth.isAuthorized('user-123'); // true
auth.isAuthorized(['admin', 'user']); // true
auth.isAuthorized('user-{params.id}', { params: { id: 123 } }); // true
auth.isAuthorized('user-{params.id}', { params: { id: 234 } }); // false
auth.isAuthorized(['admin', 'user-{params.id}'], { params: { id: 123 } }); // true
auth.isAuthorized(['admin', 'user-{query.users.0}'], { query: { users: ['123', '456', '789'] } }); // true
auth.isAuthorized(['admin', 'user-{query.users.-1}'], { query: { users: ['456', '789', '123'] } }); // true
auth.isAuthorized(['admin', 'user-{query.users.-2}'], { query: { users: ['789', '123', '456'] } }); // true
auth.isAuthorized(['admin', 'user-{query.users.-1}'], { query: { users: ['123', '456', '789'] } }); // false
```
