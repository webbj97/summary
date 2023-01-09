type T0 = Extract<"a" | "b" | "c", "a" | "f">;

// 不能将类型“{ name: string; }”分配给类型“nameAndAge”。
// 类型 "{ name: string; }" 中缺少属性 "age"，但类型 "stringMsg" 中需要该属性。
type Per = {
    name: string;
    age: number;
};
type keyofPer = keyof Per;
let aa: keyofPer = "name";

type _Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type _ReadOnly<T> = {
    readonly [K in keyof T]: T[K];
};

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
type aaa = typeof tuple; // readonly ["tesla", "model 3", "model X", "model Y"]
type TupleToObject<T extends readonly any[]> = {
    [P in T[number]]: P;
};

type First<T extends unknown[]> = T extends [infer F, ...unknown[]] ? F : never;
type head1 = First<["a", "b", "c"]>; // expected to be 'a'
type head2 = First<[() => 123, { a: string }]>; //  () => 123
type head3 = First<[]>; // expected to be never
type head4 = First<[undefined]>; // undefined
type head5 = First<"aaa">;

type result = TupleToObject<typeof tuple>;

type T1 = { name: string };
type T2 = { age: number };

type K2<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void }
    ? U
    : never;

interface Props {
    a: (x: T1) => void;
    b: (x: T2) => void;
}

type k3 = K2<Props>;
