When creating a type for a function, it doesn't follow the syntax of object types. Example:

```javascript
type User = {
	name: string,
	age: number,
	likes: string[]
};
```

Instead, for functions, it looks like this:

```javascript
type FunctionTypes = {
  registerUser: (email: string, name: string, age: number, password: string) => void
  convertTemp: (tempInF:number) => number
}
```

For `useState`, it's written like this:

```typescript
const [age, setAge] = useState<number>(); // inside the < /> (called a generic) you need to add the type
```

Async/Await functions always return a promise so the return will be Promise<> inside of the generic (<>), you'll add the return type(s) (if more than one, separate with a union (|))