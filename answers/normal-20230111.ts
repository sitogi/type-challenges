// noinspection JSUnusedLocalSymbols

import type { Alike, Equal, Expect } from '@type-challenges/utils';

/* [Get Return Type](https://github.com/type-challenges/type-challenges/blob/main/questions/00002-medium-return-type/README.md) */
{
  type MyReturnType<T> = T extends (...arg: any) => infer R ? R : never;

  type cases = [
    Expect<Equal<string, MyReturnType<() => string>>>,
    Expect<Equal<123, MyReturnType<() => 123>>>,
    Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
    Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
    Expect<Equal<() => 'foo', MyReturnType<() => () => 'foo'>>>,
    Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
    Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>,
  ]

  type ComplexObject = {
    a: [12, 'foo']
    bar: 'hello'
    prev(): number
  }

  const fn = (v: boolean) => v ? 1 : 2;
  const fn1 = (v: boolean, w: any) => v ? 1 : 2;
}

/* [Omit](https://github.com/type-challenges/type-challenges/blob/main/questions/00003-medium-omit/README.md) */
{
  type MyExclude<T, U> = T extends U ? never : T;

  type MyOmit<T, K extends keyof T> = {
    [P in MyExclude<keyof T, K>]: T[P];
  };

  type cases = [
    Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
    Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
  ]

  // @ts-expect-error
  type error = MyOmit<Todo, 'description' | 'invalid'>

  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  interface Expected1 {
    title: string;
    completed: boolean;
  }

  interface Expected2 {
    title: string;
  }
}

/* [Readonly 2](https://github.com/type-challenges/type-challenges/blob/main/questions/00008-medium-readonly-2/README.md) */
{
  type MyReadonly2<T, K extends keyof T = keyof T> = {
    readonly [P in K]: T[P]
  } & {
    [P in Exclude<keyof T, K>]: T[P]
  };

  type cases = [
    Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
    Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
    Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  ]

  // @ts-expect-error
  type error = MyReadonly2<Todo1, 'title' | 'invalid'>

  interface Todo1 {
    title: string;
    description?: string;
    completed: boolean;
  }

  interface Todo2 {
    readonly title: string;
    description?: string;
    completed: boolean;
  }

  interface Expected {
    readonly title: string;
    readonly description?: string;
    completed: boolean;
  }
}
