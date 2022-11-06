// noinspection JSUnusedLocalSymbols

import type { Equal, Expect, NotAny } from '@type-challenges/utils';

/* Hello World */
/* https://github.com/type-challenges/type-challenges/blob/main/questions/00013-warm-hello-world/README.md */
{
  type HelloWorld = any // expected to be a string

  type cases = [
    Expect<NotAny<HelloWorld>>,
    Expect<Equal<HelloWorld, string>>,
  ];
}
