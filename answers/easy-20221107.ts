// noinspection JSUnusedLocalSymbols

import type { Equal, Expect, NotAny } from '@type-challenges/utils';

/* [Hello World](https://github.com/type-challenges/type-challenges/blob/main/questions/00013-warm-hello-world/README.md) */
{
  type HelloWorld = string;

  type cases = [
    Expect<NotAny<HelloWorld>>,
    Expect<Equal<HelloWorld, string>>,
  ];
}

/* [Pick](https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md) */
{
  type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  type cases = [
    Expect<Equal<{ title: string }, MyPick<Todo, 'title'>>>,
    Expect<Equal<{ title: string; completed: boolean }, MyPick<Todo, 'title' | 'completed'>>>,
    // @ts-expect-error
    MyPick<Todo, 'title' | 'completed' | 'invalid'>,
  ]

  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }
}

// [Readonly](https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md)
{
  type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
  };

  type cases = [
    Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
  ]

  interface Todo1 {
    title: string;
    description: string;
    completed: boolean;
    meta: {
      author: string
    };
  }
}

// [Tuple to Object](https://github.com/type-challenges/type-challenges/blob/main/questions/00011-easy-tuple-to-object/README.md)
{
  type TupleToObject<T extends readonly PropertyKey[]> = {
    [O in T[number]]: O;
  };

  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;
  const tupleNumber = [1, 2, 3, 4] as const;
  const tupleMix = [1, '2', 3, '4'] as const;

  type cases = [
    Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
    Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
    Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4' }>>,
  ]

  // @ts-expect-error
  type error = TupleToObject<[[1, 2], {}]>
}

// [First of Array](https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.md)
{
  type First<T extends any[]> = T extends [infer L, ...infer R] ? L : never;

  type cases = [
    Expect<Equal<First<[3, 2, 1]>, 3>>,
    Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
    Expect<Equal<First<[]>, never>>,
    Expect<Equal<First<[undefined]>, undefined>>,
  ]

  type errors = [
    // @ts-expect-error
    First<'notArray'>,
    // @ts-expect-error
    First<{ 0: 'arrayLike' }>,
  ]
}

/* [Length of Tuple](https://github.com/type-challenges/type-challenges/blob/main/questions/00018-easy-tuple-length/README.md) */
{
  type Length<T extends readonly any[]> = T['length'];

  const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const;
  const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const;

  type cases = [
    Expect<Equal<Length<typeof tesla>, 4>>,
    Expect<Equal<Length<typeof spaceX>, 5>>,
    // @ts-expect-error
    Length<5>,
    // @ts-expect-error
    Length<'hello world'>,
  ]
}

/* [Exclude](https://github.com/type-challenges/type-challenges/blob/main/questions/00043-easy-exclude/README.md) */
{
  type MyExclude<T, U> = T extends U ? never : T;

  type cases = [
    Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
    Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
    Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
  ]
}

/* [Awaited](https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/README.md) */
{
  type MyAwaited<T extends Promise<any>> = T extends Promise<infer P>
    ? P extends Promise<any> ? MyAwaited<P> : P
    : never;

  type X = Promise<string>
  type Y = Promise<{ field: number }>
  type Z = Promise<Promise<string | number>>
  type Z1 = Promise<Promise<Promise<string | boolean>>>

  type cases = [
    Expect<Equal<MyAwaited<X>, string>>,
    Expect<Equal<MyAwaited<Y>, { field: number }>>,
    Expect<Equal<MyAwaited<Z>, string | number>>,
    Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  ]

  // @ts-expect-error
  type error = MyAwaited<number>
}

/* [If](https://github.com/type-challenges/type-challenges/blob/main/questions/00268-easy-if/README.md) */
{
  type If<C extends boolean, T, F> = C extends true ? T : F;

  type cases = [
    Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
    Expect<Equal<If<false, 'a', 2>, 2>>,
  ]

  // @ts-expect-error
  type error = If<null, 'a', 'b'>
}

/* [Concat](https://github.com/type-challenges/type-challenges/blob/main/questions/00533-easy-concat/README.md) */
{
  type Concat<T extends any[], U extends any[]> = [...T, ...U];

  type cases = [
    Expect<Equal<Concat<[], []>, []>>,
    Expect<Equal<Concat<[], [1]>, [1]>>,
    Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
    Expect<Equal<Concat<['1', 2, '3'], [false, boolean, '4']>, ['1', 2, '3', false, boolean, '4']>>,
  ]
}

/* [Includes](https://github.com/type-challenges/type-challenges/blob/main/questions/00898-easy-includes/README.md) */
{
  type Includes<T extends readonly any[], U> = T extends [infer L, ...infer R]
    // ? L extends U ? true : Includes<R, U>  // じゃだめなのか
    ? Equal<L, U> extends true ? true : Includes<R, U>
    : false;

  type cases = [
    Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
    Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
    Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
    Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
    Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
    Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
    Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
    Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
    Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
    Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
    Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
    Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
    Expect<Equal<Includes<[1], 1 | 2>, false>>,
    Expect<Equal<Includes<[1 | 2], 1>, false>>,
    Expect<Equal<Includes<[null], undefined>, false>>,
    Expect<Equal<Includes<[undefined], null>, false>>,
  ]
}

/* [Push](https://github.com/type-challenges/type-challenges/blob/main/questions/03057-easy-push/README.md) */
{
  type Push<T extends any[], U> = [...T, U];

  type cases = [
    Expect<Equal<Push<[], 1>, [1]>>,
    Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
    Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
  ]
}

/* [Unshift](https://github.com/type-challenges/type-challenges/blob/main/questions/03060-easy-unshift/README.md) */
{
  type Unshift<T extends any[], U> = [U, ...T];

  type cases = [
    Expect<Equal<Unshift<[], 1>, [1]>>,
    Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
    Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
  ]
}

/* [Parameters](https://github.com/type-challenges/type-challenges/blob/main/questions/03312-easy-parameters/README.md) */
{
  type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;

  const foo = (arg1: string, arg2: number): void => {};
  const bar = (arg1: boolean, arg2: { a: 'A' }): void => {};
  const baz = (): void => {};

  type cases = [
    Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
    Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
    Expect<Equal<MyParameters<typeof baz>, []>>,
  ]
}
