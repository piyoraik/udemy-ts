// ## 交差型
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

interface ElevatedEmploee extends Employee, Admin {}
// type ElevatedEmploee = Admin & Employee

const e1: ElevatedEmploee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

// number型
type Universal = Combinable & Numeric;

// ## 型ガード
function addFn(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformationFn(emp: UnknownEmployee) {
  console.log(emp.name);
  if ("privileges" in emp) {
    console.log("Privileges " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date " + emp.startDate);
  }
}

printEmployeeInformationFn({ name: "Manu", startDate: new Date() });

class Car {
  drive() {
    console.log("運転中...");
  }
}

class Truck {
  drive() {
    console.log("トラック運転中");
  }

  loadCargo(amount: number) {
    console.log("荷物を載せています..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

// ## 判別可能なUnion型

interface Bird {
  type: "bird";
  flyingSpeed: number;
}
interface Horse {
  type: "hourse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "hourse":
      speed = animal.runningSpeed;
  }
  console.log("移動速度: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

// ## 型キャスト
const paragraph = document.getElementById("message-output");
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!
const userInputElement = document.getElementById("input-text");

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "こんにちは";
}

// ## インデックス型
interface ErrorContainer {
  [prop: string]: string;
}

const errBag: ErrorContainer = {
  email: "正しいメールアドレスではありません",
  username: "ユーザー名に記号を含める硬派できません",
};

// ## 関数オーバーロード
function addFn2(a: number, b: number): number;
function addFn2(a: string, b: string): string;
function addFn2(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = addFn2("hello", "ts");
result.split(" ");

// ## オプショナルチェイン
const fetchUserData = {
  id: "u1",
  name: "user1",
  job: {
    title: "Developer",
    description: "TypeScript",
  },
};
console.log(fetchUserData?.job?.description);

// ## NULL合体演算子

const userInput = "";
const storedData = userInput ?? "DEDAULT";
console.log(storedData);
