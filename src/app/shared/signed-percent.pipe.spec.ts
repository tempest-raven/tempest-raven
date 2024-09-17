import { SignedPercentPipe } from './signed-percent.pipe';

describe('SignedPercentPipe', () => {
  it('create an instance', () => {
    const pipe = new SignedPercentPipe("en-US");
    expect(pipe).toBeTruthy();
  });
});
