function getName(obj: { name: string; age?: number }): void {
    console.log(obj.name);
    console.log(obj.age);
}

getName({ name: "余光" });