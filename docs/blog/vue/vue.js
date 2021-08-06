let uid = 0;

// 依赖管理器
class Dep {
    constructor() {
        this.id = uid++; // 作为标识区分
        this.subs = []; // 谁依赖的这个数据，就保存进来，方便通知
    }
    // 添加依赖方法
    addSub(sub) {
        this.subs.push(sub)
    }
    // 触发添加
    depend() {
        // 触发target上的Watcher中的addDep方法,参数为dep的实例本身
        // 暂时理解为，我们获得订阅者的方法
        Dep.target.addDep(this) // 添加依赖管理器
    }
    // 通知所有的依赖更新
    notify() {
        const subs = this.subs.slice();
        // 在这里我们触发更新
        subs.forEach(sub => sub.update())
    }
}
// 为Dep类设置一个静态属性,默认为null,工作时指向当前的Watcher
// 这里我有看到利用window.target来保存临时watcher的，是两者均可还是另有玄机不知道有没有大佬解惑
Dep.target = null; // 初始化为null

// 监听类
class Observer {
    constructor(value) {
        this.value = value;
        if (Array.isArray(value)) {

        } else {
            this.walk(value)
        }
    }
    walk(value) {
        const keys = Object.keys(value);
        keys.forEach(key => {
            this.convert(key, value[key])
        });

    }
    convert(key, val) {
        defineReactive(this.value, key, val)
    }
}

function defineReactive(obj, key, val) {
    const dep = new Dep();
    // 给子元素添加监听
    let chlidOb = observe(val);
    Object.defineProperty(obj, key, {
        get() {
            // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
            // target指向一个Watcher实例，每个Watcher都是一个订阅者
            // Watcher实例在实例化过程中，会读取data中的某个属性，从而触发当前get方法
            if (Dep.darget) {
                dep.depend();
            }
            return val;
        },
        set(newValue) {
            if (val === newValue) {
                return;
            }
            val = newValue;
            chlidOb = observe(newValue);
            // 通过依赖管理器，通知所有订阅者更新
            dep.notify();
        }
    })
}
// 添加监听
function observe(value) {
    // 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
}
// 实现一个订阅者，即“依赖”者
class Watcher {
    constructor(vm, expOrFn, cb) {
        this.depIds = {}; // hash储存订阅者的id,避免重复的订阅者
        this.vm = vm; // 被订阅的数据一定来自于当前Vue实例
        this.cb = cb; // 当数据更新时想要做的事情
        this.expOrFn = expOrFn; // 被订阅的数据
        this.val = this.get(); // 维护更新之前的数据
    }
    // 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员(Dep)调用
    update() {
        this.run();
    }
    addDep(dep) {
        // 如果在depIds的hash中没有当前的id,可以判断是新Watcher,因此可以添加到dep的数组中储存
        // 此判断是避免同id的Watcher被多次储存
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    }
    run() {
        // 指定一次get方法
        const val = this.get();
        console.log(val);
        if (val !== this.val) {
            this.val = val;
            this.cb.call(this.vm, val);
        }
    }
    get() {
        // 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
        Dep.target = this; // 赋值给Dep.target
        // 这段代码需要结合上下文，含义是主动触发get，将该订阅者添加到依赖管理器中
        const val = this.vm._data[this.expOrFn]; // 主动触发
        // 置空，用于下一个Watcher使用
        Dep.target = null;
        return val;
    }
}

class Vue {
    constructor(options = {}) {
        // 简化了$options的处理
        this.$options = options;
        // 简化了对data的处理
        let data = (this._data = this.$options.data);
        // 将所有data最外层属性代理到Vue实例上
        Object.keys(data).forEach(key => this._proxy(key));
        // 监听数据
        observe(data);
    }
    // 对外暴露调用订阅者的接口，内部主要在指令中使用订阅者
    $watch(expOrFn, cb) {
        new Watcher(this, expOrFn, cb);
    }
    _proxy(key) {
        Object.defineProperty(this, key, {
            configurable: true,
            enumerable: true,
            get: () => this._data[key],
            set: val => {
                this._data[key] = val;
            },
        });
    }
}

let demo = new Vue({
    data: {
        text: '',
    },
});

const p = document.getElementById('p');
const input = document.getElementById('input');

input.addEventListener('keyup', function(e) {
    demo.text = e.target.value;
});

demo.$watch('text', str => p.innerHTML = str);

