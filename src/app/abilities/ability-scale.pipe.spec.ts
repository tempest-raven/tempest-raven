import { AbilityScalePipe } from './ability-scale.pipe';

describe('AbilityScalePipe', () => {
  it('create an instance', () => {
    const pipe = new AbilityScalePipe("en-US");
    expect(pipe).toBeTruthy();
  });
});
