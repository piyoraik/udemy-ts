function Logger(logString: string) {
  console.log("LOGGER ファクトリ");
  return function (constractor: Function) {
    console.log(logString);
    console.log(constractor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE ファクトリ");
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("テンプレートを表示");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@Logger("ログ出力中 - PERSON")
@WithTemplate("<h1>Personオブジェクト</h1>", "app")
class PersonClass {
  name = "MAX";

  constructor() {
    console.log("Personオブジェクトを作成中...");
  }
}

const pers = new PersonClass();
console.log(pers);

// ---

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property デコレータ");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor デコレータ");
  console.log(target);
  console.log(name);
  console.log(descriptor);
  return;
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method デコレータ");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter デコレータ");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("不正な価格です - 0以下は設定できません");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product("Book", 100);
const p2 = new Product("Book2", 200);

// ---

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    // プロパティのアクセスする前にロジックを実行する
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "クリックしました";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}
const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);
