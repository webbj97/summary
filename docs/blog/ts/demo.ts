type obj = { name: string; age: number };
// 取1个
type _num = obj["name"];
// 取多个
type _strOrNum = obj["name" | "age"];
// 取所有
type objT = obj[keyof obj];

// type unExist = obj["hahaha"]; // 类型“obj”上不存在属性“hahaha”。

const MyArray = [
    { name: "余光", age: 18 },
    { name: "余光", age: 18 },
];
type eleT = typeof MyArray[number];

const APP = ["TaoBao", "Tmall", "Alipay"] as const;
type typeOfAPP = typeof APP; // readonly ["TaoBao", "Tmall", "Alipay"]
type App = typeof APP[number]; // type app = "TaoBao" | "Tmall" | "Alipay"

function getPhoto(app: App) {
    // ...
}
getPhoto("TaoBao");
// getPhoto("aaa"); //类型“"aaa"”的参数不能赋给类型“"TaoBao" | "Tmall" | "Alipay"”的参数。

interface IdLabel {
    id: number /* some fields */;
}
interface NameLabel {
    name: string /* other fields */;
}
// 无意义泛型
type unT<T> = T;
type numberT = unT<1>;

// 类型是number，就是id类型，否则就是名称类型
type NameOrId<T extends number | string> = T extends number
    ? IdLabel
    : NameLabel;

// type MessageOf<T extends { message: unknown }> = T["message"];

// type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
    message: string;
}
interface Email1 {
    noMessage: string;
}
// 取到泛型内message的类型
// type EmailMessageContents = MessageOf<Email>;
// type EmailMessageOrNeverContents1 = MessageOf<Email>; // string
// type EmailMessageOrNeverContents2 = MessageOf<Email1>; // never

type inferT<T> = T extends { message: infer R } ? R : never;
type _inferT1 = inferT<1>;
type _inferT2 = inferT<Email>;

type number_7 = number extends number ? number : string;

class Point {
    get prop() {
        return "getter";
    }
    set prop(value) {
        console.log("setter: " + value);
    }
}

const inst = new Point();
inst.prop = '123';
// setter: 123
console.log(inst.prop)

