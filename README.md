# Tempest Raven

Tempest Raven is a platform that lets you consult detailed internal data about the [Sonny 2 flash game](https://armorgames.com/play/2900/sonny-2) published by [Armor Games](https://armorgames.com/). It is published under the [MIT License](./LICENSE.txt).

## Features

### Current features

- View ability data
- View buff data
- Share links for any specific data (for example the rank 3 of Vicious Strike)

### Planned or upcoming features

In no particular order:
- Support for the in-game English and German translations
- Support for [Sonny](https://armorgames.com/play/505/sonny) data
- Adding items
- Adding units
- Adding fights
- Adding class ability trees

This list is not exhaustive, and a feature being in the list does not guarantee its implementation. Items may be added, changed or removed at any moment.

### Unlikely to be added

While it is possible for the following features to be added, at this stage of the project, these are considered unlikely to be implemented:

- Support for [Sonny (2017)](https://store.steampowered.com/app/586750/Sonny/) data. Sonny 2017 is made from scratch, and uses a different engine (Unity), and as such, its data structure isn't compatible at all with the flash games' data
- Animations and character models. Implementing those without resorting to hand-made images and GIFs is likely to be (very) difficult. 

## Play Sonny and Sonny 2

You can play both Sonny games:
- Directly on https://armorgames.com : [Sonny](https://armorgames.com/play/505/sonny) — [Sonny 2](https://armorgames.com/play/2900/sonny-2)
  - Easiest method, but lower compatibility (mostly minor visual glitches) because of the usage of the Ruffle emulator
- Via [Flashpoint archive](https://flashpointarchive.org/)
  - Also access many other web games with high compatibility, but requires a few GB of disk space just for the base install
- Through the [Flash Player projector (archive.org link)](https://archive.org/details/flashplayer32_0r0_363_win_sa) + a local copy of the game files. Download links directly from armorgames.com: [Sonny](https://cache.armorgames.com/files/games/sonny-505.swf) — [Sonny 2](https://cache.armorgames.com/files/games/sonny-2-2900.swf)
  - Best method to preserve high compatibility *and* disk space, and can load modded versions, but requires some manual set-up
- NEW: On Steam : [Sonny Legacy Collection](https://store.steampowered.com/app/2757720/Sonny_Legacy_Collection/)
  - Achievement support, high compatibility and improved performance, but is a paid game. ☕ Support the devs!

## Other ressources

If you like Sonny, check out these links!

[Sonny Wiki](https://sonny.fandom.com/wiki/Sonny_Wiki) — [Sonny Community Discord server](https://discord.gg/nkn5g6KEBF) — [Reddit](https://www.reddit.com/r/Sonny/)

## Contributing

As an open-source project, everyone is welcome to provide any contributions, like code or graphical assets. In order to preserve license compatibility, by contributing, you agree to submit your contributions under the MIT license. Be sure you are legally allowed to do so.

## For developers

This repository consists of a website that uses [Angular](https://angular.dev/) as its primary framework.

### Requirements

- [Node.js](https://nodejs.org) version 20.17.0 (LTS) or later
- A terminal capable of running node, npm and angular CLI commands

### Installation

- Clone this repository
- Run `npm install`

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
