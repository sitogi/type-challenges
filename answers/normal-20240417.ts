// noinspection JSUnusedLocalSymbols

import type { Alike, Equal, Expect } from '@type-challenges/utils';

/* [Get Return Type](https://github.com/type-challenges/type-challenges/blob/main/questions/00002-medium-return-type/README.md) */
{
  type MyReturnType<T> = T extends (...args: any) => infer R ? R : never;

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
  type MyReadonly2<T, K extends keyof T = keyof T> =
    { readonly [Key in K]: T[Key] } &
    { [Key in Exclude<keyof T, K>]: T[Key] }

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

/* [Deep Readonly](https://github.com/type-challenges/type-challenges/blob/main/questions/00009-medium-deep-readonly/README.md) */
{
  type DeepReadonly<T> = any

  type cases = [Expect<Equal<DeepReadonly<X>, Expected>>];

  type X = {
    a: () => 22
    b: string
    c: {
      d: boolean
      e: {
        g: {
          h: {
            i: true
            j: 'string'
          }
          k: 'hello'
        }
        l: [
          'hi',
          {
            m: ['hey']
          },
        ]
      }
    }
  }

  type Expected = {
    readonly a: () => 22
    readonly b: string
    readonly c: {
      readonly d: boolean
      readonly e: {
        readonly g: {
          readonly h: {
            readonly i: true
            readonly j: 'string'
          }
          readonly k: 'hello'
        }
        readonly l: readonly [
          'hi',
          {
            readonly m: readonly ['hey']
          },
        ]
      }
    }
  }
}

/* [Tuple to Union](https://github.com/type-challenges/type-challenges/blob/main/questions/00010-medium-tuple-to-union/README.md) */
{
  type TupleToUnion<T> = any;

  type cases = [
    Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
    Expect<Equal<TupleToUnion<[123]>, 123>>,
  ];
}

/* [Chainable Options](https://github.com/type-challenges/type-challenges/blob/main/questions/00012-medium-chainable-options/README.ja.md)  */

  /* _____________ ここにコードを記入 _____________ */

  type Chainable = {
    option(key: string, value: any): any
    get(): any
  }


  declare const a: Chainable

  const result1 = a
    .option('foo', 123)
    .option('bar', { value: 'Hello World' })
    .option('name', 'type-challenges')
    .get()

  const result2 = a
    .option('name', 'another name')
    // @ts-expect-error
    .option('name', 'last name')
    .get()

  const result3 = a
    .option('name', 'another name')
    // @ts-expect-error
    .option('name', 123)
    .get()

  type cases = [
    Expect<Alike<typeof result1, Expected1>>,
    Expect<Alike<typeof result2, Expected2>>,
    Expect<Alike<typeof result3, Expected3>>,
  ]

  type Expected1 = {
    foo: number
    bar: {
      value: string
    }
    name: string
  }

  type Expected2 = {
    name: string
  }

  type Expected3 = {
    name: number
  }
