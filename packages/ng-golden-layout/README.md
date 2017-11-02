
# [ng-golden-layout](https://github.com/goldsam/ng-golden-layout)  [![Build Status](https://travis-ci.org/goldsam/ng-golden-layout.svg?branch=master)](https://travis-ci.org/goldsam/ng-golden-layout)

Angular 2.4.x Compatible

## Installation

To install this library and its dependencies, run:

```bash
$ npm install @goldsam/ng-golden-layout golden-layout --save
$ npm install @types/jquery --save-dev
```

## Getting Started
First, import `GoldenLayoutModule` into your root AppModule

```typescript
import {GoldenLayoutModule} from '@goldsam/ng-golden-layout';
```

Then, add `GoldenLayoutModule.forRoot()` to your AppModule's import array

```typescript
@NgModule({
  imports : [
    CommonModule, 
    GoldenLayoutModule.forRoot({
        ...
    })), 
    ...
  ],
  ...
})
export class AppModule {}
```


## TODO
1. Implement support for saving/restoring golden-layout state.
2. Improve this README
3. Create unit and E2E tests

## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:
 
```bash
$ npm run tsc
```

## License

MIT © [Sam Goldmann](sam.goldmann@gmail.com)
