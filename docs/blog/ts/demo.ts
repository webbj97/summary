type T0 = Extract<"a" | "b" | "c", "a" | "f">;

type numberMsg = {
    name: string;
};

type stringMsg = {
    age: number;
};

type nameAndAge = numberMsg & stringMsg;

const aaa: nameAndAge = {
    name: "string",
};

enum number_d {
    aaa = 1
}

// 不能将类型“{ name: string; }”分配给类型“nameAndAge”。
// 类型 "{ name: string; }" 中缺少属性 "age"，但类型 "stringMsg" 中需要该属性。
