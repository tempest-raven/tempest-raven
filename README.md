# Tempest Raven

Tempest Raven is a platform for exploring detailed internal data about the [Sonny 2 flash game](https://armorgames.com/play/2900/sonny-2) published by [Armor Games](https://armorgames.com/). The project is open-source and released under the [MIT License](./LICENSE.txt).

## Features

### Current features

- View all abilities
- View all buffs
- View all items (including many unused ones)

### Planned features

In no particular order:
- Adding in-game sprites when possible (items, units, buffs, ability icons)
- Support for the in-game English and German translations
- Support for [Sonny](https://armorgames.com/play/505/sonny) data
- Adding units
- Adding fights
- Adding class ability trees

This list is not exhaustive, and planned features may be added, changed, or removed at any time.

### Unlikely to be added

These features are possible, but unlikely to be implemented:

- Support for [Sonny (2017)](https://store.steampowered.com/app/586750/Sonny/) data. Sonny 2017 is made from scratch, and uses a different engine (Unity), and as such, its data structure isn't compatible at all with the flash games' data
- Animations and character models. Implementing those would likely require using hand-made images and GIFs for each. 

## Play Sonny and Sonny 2

You can play both Sonny games:
- Directly on https://armorgames.com : [Sonny](https://armorgames.com/play/505/sonny) — [Sonny 2](https://armorgames.com/play/2900/sonny-2)
  - Easiest, but minor glitches (mostly visual) because of the Ruffle emulator
- Via [Flashpoint archive](https://flashpointarchive.org/)
  - Also access many other web games with high compatibility, but requires a few GB of disk space just for the base install
- Through the [Flash Player projector (archive.org link)](https://archive.org/details/flashplayer32_0r0_363_win_sa) + a local copy of the game files. 
  - Download links directly from armorgames.com: [Sonny](https://cache.armorgames.com/files/games/sonny-505.swf) — [Sonny 2](https://cache.armorgames.com/files/games/sonny-2-2900.swf)
  - Best way to preserve both high compatibility and disk space, and is the best method to load modded versions on PC, but requires managing files yourself
- On Steam : [Sonny Legacy Collection](https://store.steampowered.com/app/2757720/Sonny_Legacy_Collection/)
  - Achievement support, high compatibility and improved performance. ☕ Support the devs!

## Other ressources

If you like Sonny, check out these links!

[Sonny Wiki](https://sonny.wiki.gg/) — [Sonny Community Discord server](https://discord.gg/nkn5g6KEBF) — [Reddit](https://www.reddit.com/r/Sonny/)

## Contributing

As an open-source project, everyone is welcome to contribute code or graphical assets. By contributing, you agree to license your work under MIT.

## For developers

### Requirements

- [Node.js](https://nodejs.org) version 24 (LTS)

### Setup

- Run `npm i`
- If not already present on your system, install Angular CLI: `npm install -g @angular/cli`

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
