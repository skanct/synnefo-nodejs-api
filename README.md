synnefo-nodejs-api
==================

The synnefo-api is a module that allows you to communicate with the [Synnefo APIs](https://www.digitalocean.com/api) from node.js

Synnefo is a complete open source cloud stack written in Python that provides Compute, Network, Image, Volume and Storage services. 

## Installation

TBD

## Usage

TBD

## Methods

All methods follow the [official API documentation](https://www.synnefo.org/docs/synnefo/latest/api-guide.html).

More [detailed documentation](http://skanct.github.io/synnefo-nodejs-api/) generated from the source code is available.

Convention for callback arguments: `callback(error, data)`

### Servers

```js
serverList(callback)
serverListDetail(callback)
serverCreate(name, imageId, flavorId, optionals, callback)
serverGet(id, callback)
serverReboot(id, callback)
serverShutdown(id, callback)
serverDelete(id, callback)
```

### Images

```js
imageList(callback)
imageListDetail(callback)
imageGet(id, callback)
```

### Flavors

```js
flavorList(callback)
flavorListDetail(callback)
flavorGet(id, callback)
```

## Acknowledgments

This module is inspired by the excellent nodejs module for the [digitalocean-api](https://github.com/enzy/digitalocean-api) by Matěj Šimek