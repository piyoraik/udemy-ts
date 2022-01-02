// abstractクラスはインスタンス化することはできない
// 継承されるためだけのもの、サブクラスはabstractメソッド・プロパティの実装をする必要
abstract class Department {
  static fiscalYear = 2022;
  // private readonly id: string;
  // name: string;
  protected employees: string[] = [];

  static createEmployee(name: string) {
    return { name: name };
  }

  constructor(protected readonly id: string, public name: string) {
    console.log(`Static: ${Department.fiscalYear}`);
    // this.id = id
    // this.name = n;
  }

  abstract describe(this: Department): void

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: string, private admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }

  describe(): void {
    console.log("IT部門 - ID: " + this.id)
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("レポートが見つかりません");
  }

  set mostRecentReport(value: string) {
    if (!value) throw new Error("正しい値を設定してください");
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }
  static getInstance() {
    // staticメソッドのthisはクラスを指す
    if(this.instance) {
      return this.instance
    }
    this.instance = new AccountingDepartment('d2', [])
    return this.instance
  }

  describe() {
    console.log("会計部門 - ID:" + this.id);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }

  addEmployee(name: string) {
    if (name === "MAX") return;
    this.employees.push(name);
  }
}

// staticメソッド・プロパティ
const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);

// 継承
const it = new ITDepartment("d1", ["MAX"]);
it.addEmployee("Max");
it.addEmployee("Manu");

it.describe();
it.printEmployeeInformation();

console.log(it);

// 継承・ゲッター・セッター・オーバーライド・シングルトンパターン
// const accounting = new AccountingDepartment("d2", []);
const accounting = AccountingDepartment.getInstance()
accounting.mostRecentReport = "通期会計レポート";
accounting.addReport("Someting");
// accounting.printReports();
console.log(accounting.mostRecentReport);

accounting.addEmployee("MAX");
accounting.addEmployee("Manu");
// accounting.printEmployeeInformation();
accounting.describe();
