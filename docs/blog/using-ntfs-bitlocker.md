---
layout: post
title:  "Using NTFS Bitlocker external SSD on Fedora"
author: Guillermo Zaandam
categories: [Linux, Fedora, Bitlocker]
image: assets/images/bitlocker_fedora.png
featured: true
toc: false
published: true
---

So I figured out that, `yarn` may be better than `npm` when installing packages.

## Intro

So I figured out that, `yarn` may be better than `npm` when installing packages.
Reason why I use `yarn` instead of `npm` can be found here: [Yarn: A new package manager for JavaScript](https://engineering.fb.com/2016/10/11/web/yarn-a-new-package-manager-for-javascript/)

Along side these tools, I use Node Version Manager:

*nvm is a version manager for node.js, designed to be installed per-user, and invoked per-shell. nvm works on any POSIX-compliant shell (sh, dash, ksh, zsh, bash), in particular on these platforms: unix, macOS, and windows WSL.* ~ https://github.com/nvm-sh/nvm

The reason why I use NVM:

- Use other version of `npm`.
- Using `yarn` without installing it with *elevated rights*

## Using yarn

Since I couldn't use `yarn` on my system without(Fedora) using elevated rights. see error:

```bash
[guillermo@uhuh~]$ npm install --global yarn
npm ERR! code EACCES
npm ERR! syscall rename
npm ERR! path /usr/local/lib/node_modules/yarn
npm ERR! dest /usr/local/lib/node_modules/.yarn-Jrexx8nI
npm ERR! errno -13
npm ERR! Error: EACCES: permission denied, rename '/usr/local/lib/node_modules/yarn' -> '/usr/local/lib/node_modules/.yarn-Jrexx8nI'
```

I had to find a solution for this problem and my resolution was to use `nvm` which obviously using a good reason to use, even without `yarn`.
My source for the solution can be found here: [Resolving EACCES permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

## Installing nvm and yarn

So Installed this script: (I don't like using scripts to install binaries, because that's the job of the package manager.)

1. https://github.com/nvm-sh/nvm#install--update-script
2. nvm install --lts (for installing the latest nodejs LTS version)
3. npm install --global yarn

For lazy people copy this:

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install --lts
npm install --global yarn
 ```

 and use `yarn create react-app my-app` to use yarn as packagemanger. (Mind the space in `yarn create` part, it isn't a spelling mistake.)

## Using yarn e.g. create react-app my-app

Accoridng to [Create a New React App](https://reactjs.org/docs/create-a-new-react-app.html)

You will need to use the command `npx create-react-app my-app` which is going to `npm` instead of `yarn` to install your packages. Which we don't want.
The reason why `npx` defaults to `npm` is explained on GitHub by [iansu](https://github.com/iansu):

*"We've actually made some changes to this since the initial PR. Our goal is to make running create-react-app deterministic. With the old behaviour two people running npx create-react-app my-app could end up with different installs if one of them happened to have Yarn installed.*

*The new behaviour in this PR looks at how create-react-app was invoked and uses the corresponding package manager. npx create-react-app my-app will use npm and yarn dlx create-react-app my-app (or yarn create react-app my-app) will use Yarn. This will also potentially allow us to add support for other package managers by following the same pattern."*

Source: [https://github.com/facebook/create-react-app/pull/11322](https://github.com/facebook/create-react-app/pull/11322)

To use `yarn`, you will need to use the command `yarn create react-app my-app` (Mind the space in `yarn create` part, it isn't a spelling mistake.)
Using `create-react-app my-app` will also use `npm` as package manager.
