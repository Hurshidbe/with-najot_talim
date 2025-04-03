// 1- mashq
// interface Iperson {
//   id: number;
//   name: string;
//   age: number;
//   email: string;
// }

// 2-mashq

// interface Iemployee {
//   department: string;
//   salary: number;
//   hiredate: Date;
// }

// interface Iperson {
//   id: number;
//   name: string;
//   age: number;
//   email: string;
//   Employee: Iemployee;
// }

// 3- mashq

// interface readonlUser {
//   readonly id: number;
//   readonly username: string;
//   readonly registrationDate?: Date;
// }

// const User: readonlUser = {
//   id: 1,
//   username: "Hurshid",
// };

// console.log(User);

//4-mashq

// interface IAddress {
//   country: string;
//   region: string;
//   village: string;
//   street: string;
//   home_number: number;
// }

// interface ICustomer {
//   username: string;
//   phone_number: number;
//   email: string;
//   adress: IAddress;
// }

// 5 - mashq

// interface Icalculator {
//   qoshish(a: number, b: number): number;
//   ayirish(a: number, b: number): number;
//   kopaytirish(a: number, b: number): number;
//   bolish(a: number, b: number): number;
// }

// class calculator implements Icalculator {
//   qoshish(a: number, b: number): number {
//     console.log("qo'shish amali ishlatildi");
//     return a + b;
//   }
//   ayirish(a: number, b: number): number {
//     console.log("ayirish amali ishlatildi");

//     return a - b;
//   }
//   kopaytirish(a: number, b: number): number {
//     console.log("ko'paytirish amali ishlatildi");

//     return a * b;
//   }
//   bolish(a: number, b: number): number {
//     console.log("bo'lish amali ishlatildi");

//     return a / b;
//   }
// }

// const xisobla = new calculator();

// console.log(xisobla.qoshish(5, 5));
// console.log(xisobla.bolish(100, 10));

// 6- mashq

// type adminpesmissions = {
//   candeleteUser: boolean;
//   canadduser: boolean;
// };

// type userPermissions = {
//   canViewContents: boolean;
//   canWriteContent: boolean;
// };

// type PremiumUserPermissons = adminpesmissions & userPermissions;

// const premiumUser: PremiumUserPermissons = {
//   canadduser: true,
//   candeleteUser: true,
//   canViewContents: true,
//   canWriteContent: true,
// };

// console.log(premiumUser);

// 7  - mashq

// type status = "active"|"inactive"|"pending",

// type apiresponse = {
//     status: status
//     data?: string
// }

// const response1: apiresponse = {
//     status: "pending"
// }

// const response2 : apiresponse = {
//     status: "inactive",
//     data : "user is not active now"
// }
// const response3 :apiresponse = {
//     status:"active"
// }

// 8 - mashq
// type isArray<T> = T extends any[] ? true : false;

// type Test1 = isArray<number[]>;

// 9 - mashq
// interface User {
//   name: string;
//   role?: string;
// }

// interface Admin extends User {
//   role: "admin";
// }
// function isAdmin(user: User): user is Admin {
//   return user.role === "admin";
// }
// const user1: User = { name: "Ali", role: "admin" };
// const user2: User = { name: "Vali" };

// if (isAdmin(user1)) {
//   console.log(`${user1.name} admin! ðŸŽ‰`);
// } else {
//   console.log(`${user1.name} oddiy user.`);
// }

// if (isAdmin(user2)) {
//   console.log(`${user2.name} admin! ðŸŽ‰`);
// } else {
//   console.log(`${user2.name} oddiy user.`);
// }
// 10 - Mashq: Mapped Types

// interface Person {
//     name: string;
//     age: number;
//     email: string;
//   }

//   type PartialPerson = {
//     [Key in keyof Person]?: Person[Key];
//   };

// 11 - Mashq: Partial<T> Utility Type

//   interface Product {
//     title: string;
//     price: number;
//     description: string;
//   }

//   type UpdateProduct = Partial<Product>;

// 12 - Mashq: Required<T> Utility Type

//   interface PartialUser {
//     name?: string;
//     email?: string;
//     password?: string;
//   }

//   type User = Required<PartialUser>;

// 13 - Mashq: Pick<T, K> Utility Type

//   interface UserProfile {
//     name: string;
//     bio: string;
//     avatar: string;
//     email: string;
//     phone: string;
//   }

//   type PublicProfile = Pick<UserProfile, 'name' | 'bio' | 'avatar'>;

// 14 - Mashq: Omit<T, K> Utility Type

//   interface Article {
//     title: string;
//     content: string;
//     author: string;
//     comments: string[];
//   }

//   type ArticlePreview = Omit<Article, 'content' | 'comments'>;

// Mashq 15: Record<K, T> Utility Type

// type UserRoles = Record<string, string[]>;

// const userRoles: UserRoles = {
//   user1: ["admin", "editor"],
//   user2: ["viewer"],
//   user3: ["editor", "moderator"],
// };

// // Mashq 16: Exclude<T, U> Utility Type

// type AllColors = "red" | "blue" | "green" | "black" | "white";
// type AvailableColors = Exclude<AllColors, "black" | "white">;

// const favoriteColor: AvailableColors = "blue";

// Mashq 17: Extract<T, U> Utility Type

// type AllEvents =
//   | { category: "user"; type: "login" }
//   | { category: "system"; type: "update" };
// type UserEvents = Extract<AllEvents, { category: "user" }>;

// const userLoginEvent: UserEvents = { category: "user", type: "login" };

// Mashq 18: NonNullable<T> Utility Type

// type OptionalData = string | null | undefined;
// type RequiredData = NonNullable<OptionalData>;

// const importantData: RequiredData = "This is essential data";

// Mashq 19: ReturnType<T> Utility Type

// function fetchData() {
//   return { id: 1, name: "Product", price: 100 };
// }

// type DataType = ReturnType<typeof fetchData>;

// const productData: DataType = { id: 2, name: "Book", price: 20 };

// Mashq 20: Parameters<T> Utility Type

// function createUser(name: string, age: number, email: string) {
//   return { name, age, email };
// }

// type CreateUserParams = Parameters<typeof createUser>;

// const newUser: CreateUserParams = ["John Doe", 25, "john@example.com"];
