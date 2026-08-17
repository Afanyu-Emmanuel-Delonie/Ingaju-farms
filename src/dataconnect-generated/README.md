# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ReadData*](#readdata)
  - [*ListData*](#listdata)
- [**Mutations**](#mutations)
  - [*CreateData*](#createdata)
  - [*UpdateData*](#updatedata)
  - [*DeleteData*](#deletedata)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ReadData
You can execute the `ReadData` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
readData(options?: ExecuteQueryOptions): QueryPromise<ReadDataData, undefined>;

interface ReadDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ReadDataData, undefined>;
}
export const readDataRef: ReadDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
readData(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ReadDataData, undefined>;

interface ReadDataRef {
  ...
  (dc: DataConnect): QueryRef<ReadDataData, undefined>;
}
export const readDataRef: ReadDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the readDataRef:
```typescript
const name = readDataRef.operationName;
console.log(name);
```

### Variables
The `ReadData` query has no variables.
### Return Type
Recall that executing the `ReadData` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReadDataData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReadDataData {
  user?: {
    displayName?: string | null;
    email: string;
  };
  category?: {
    name: string;
  };
  blogPost?: {
    title: string;
    content: string;
  };
  form?: {
    title: string;
  };
  formField?: {
    label: string;
  };
  formSubmission?: {
    submittedAt: TimestampString;
  };
}
```
### Using `ReadData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, readData } from '@dataconnect/generated';


// Call the `readData()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await readData();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await readData(dataConnect);

console.log(data.user);
console.log(data.category);
console.log(data.blogPost);
console.log(data.form);
console.log(data.formField);
console.log(data.formSubmission);

// Or, you can use the `Promise` API.
readData().then((response) => {
  const data = response.data;
  console.log(data.user);
  console.log(data.category);
  console.log(data.blogPost);
  console.log(data.form);
  console.log(data.formField);
  console.log(data.formSubmission);
});
```

### Using `ReadData`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, readDataRef } from '@dataconnect/generated';


// Call the `readDataRef()` function to get a reference to the query.
const ref = readDataRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = readDataRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);
console.log(data.category);
console.log(data.blogPost);
console.log(data.form);
console.log(data.formField);
console.log(data.formSubmission);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
  console.log(data.category);
  console.log(data.blogPost);
  console.log(data.form);
  console.log(data.formField);
  console.log(data.formSubmission);
});
```

## ListData
You can execute the `ListData` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listData(options?: ExecuteQueryOptions): QueryPromise<ListDataData, undefined>;

interface ListDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDataData, undefined>;
}
export const listDataRef: ListDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listData(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListDataData, undefined>;

interface ListDataRef {
  ...
  (dc: DataConnect): QueryRef<ListDataData, undefined>;
}
export const listDataRef: ListDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listDataRef:
```typescript
const name = listDataRef.operationName;
console.log(name);
```

### Variables
The `ListData` query has no variables.
### Return Type
Recall that executing the `ListData` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListDataData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListDataData {
  users: ({
    email: string;
  })[];
  categories: ({
    name: string;
  })[];
  blogPosts: ({
    title: string;
  })[];
  forms: ({
    title: string;
  })[];
  formFields: ({
    label: string;
  })[];
  formSubmissions: ({
    submittedAt: TimestampString;
  })[];
}
```
### Using `ListData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listData } from '@dataconnect/generated';


// Call the `listData()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listData();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listData(dataConnect);

console.log(data.users);
console.log(data.categories);
console.log(data.blogPosts);
console.log(data.forms);
console.log(data.formFields);
console.log(data.formSubmissions);

// Or, you can use the `Promise` API.
listData().then((response) => {
  const data = response.data;
  console.log(data.users);
  console.log(data.categories);
  console.log(data.blogPosts);
  console.log(data.forms);
  console.log(data.formFields);
  console.log(data.formSubmissions);
});
```

### Using `ListData`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listDataRef } from '@dataconnect/generated';


// Call the `listDataRef()` function to get a reference to the query.
const ref = listDataRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listDataRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);
console.log(data.categories);
console.log(data.blogPosts);
console.log(data.forms);
console.log(data.formFields);
console.log(data.formSubmissions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
  console.log(data.categories);
  console.log(data.blogPosts);
  console.log(data.forms);
  console.log(data.formFields);
  console.log(data.formSubmissions);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateData
You can execute the `CreateData` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createData(): MutationPromise<CreateDataData, undefined>;

interface CreateDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateDataData, undefined>;
}
export const createDataRef: CreateDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createData(dc: DataConnect): MutationPromise<CreateDataData, undefined>;

interface CreateDataRef {
  ...
  (dc: DataConnect): MutationRef<CreateDataData, undefined>;
}
export const createDataRef: CreateDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDataRef:
```typescript
const name = createDataRef.operationName;
console.log(name);
```

### Variables
The `CreateData` mutation has no variables.
### Return Type
Recall that executing the `CreateData` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDataData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDataData {
  user_insert: User_Key;
  category_insert: Category_Key;
  blogPost_insert: BlogPost_Key;
  form_insert: Form_Key;
  formField_insert: FormField_Key;
  formSubmission_insert: FormSubmission_Key;
}
```
### Using `CreateData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createData } from '@dataconnect/generated';


// Call the `createData()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createData();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createData(dataConnect);

console.log(data.user_insert);
console.log(data.category_insert);
console.log(data.blogPost_insert);
console.log(data.form_insert);
console.log(data.formField_insert);
console.log(data.formSubmission_insert);

// Or, you can use the `Promise` API.
createData().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
  console.log(data.category_insert);
  console.log(data.blogPost_insert);
  console.log(data.form_insert);
  console.log(data.formField_insert);
  console.log(data.formSubmission_insert);
});
```

### Using `CreateData`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDataRef } from '@dataconnect/generated';


// Call the `createDataRef()` function to get a reference to the mutation.
const ref = createDataRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDataRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);
console.log(data.category_insert);
console.log(data.blogPost_insert);
console.log(data.form_insert);
console.log(data.formField_insert);
console.log(data.formSubmission_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
  console.log(data.category_insert);
  console.log(data.blogPost_insert);
  console.log(data.form_insert);
  console.log(data.formField_insert);
  console.log(data.formSubmission_insert);
});
```

## UpdateData
You can execute the `UpdateData` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateData(): MutationPromise<UpdateDataData, undefined>;

interface UpdateDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateDataData, undefined>;
}
export const updateDataRef: UpdateDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateData(dc: DataConnect): MutationPromise<UpdateDataData, undefined>;

interface UpdateDataRef {
  ...
  (dc: DataConnect): MutationRef<UpdateDataData, undefined>;
}
export const updateDataRef: UpdateDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateDataRef:
```typescript
const name = updateDataRef.operationName;
console.log(name);
```

### Variables
The `UpdateData` mutation has no variables.
### Return Type
Recall that executing the `UpdateData` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateDataData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateDataData {
  user_update?: User_Key | null;
  category_update?: Category_Key | null;
  blogPost_update?: BlogPost_Key | null;
  form_update?: Form_Key | null;
  formField_update?: FormField_Key | null;
  formSubmission_update?: FormSubmission_Key | null;
}
```
### Using `UpdateData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateData } from '@dataconnect/generated';


// Call the `updateData()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateData();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateData(dataConnect);

console.log(data.user_update);
console.log(data.category_update);
console.log(data.blogPost_update);
console.log(data.form_update);
console.log(data.formField_update);
console.log(data.formSubmission_update);

// Or, you can use the `Promise` API.
updateData().then((response) => {
  const data = response.data;
  console.log(data.user_update);
  console.log(data.category_update);
  console.log(data.blogPost_update);
  console.log(data.form_update);
  console.log(data.formField_update);
  console.log(data.formSubmission_update);
});
```

### Using `UpdateData`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateDataRef } from '@dataconnect/generated';


// Call the `updateDataRef()` function to get a reference to the mutation.
const ref = updateDataRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateDataRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);
console.log(data.category_update);
console.log(data.blogPost_update);
console.log(data.form_update);
console.log(data.formField_update);
console.log(data.formSubmission_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
  console.log(data.category_update);
  console.log(data.blogPost_update);
  console.log(data.form_update);
  console.log(data.formField_update);
  console.log(data.formSubmission_update);
});
```

## DeleteData
You can execute the `DeleteData` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteData(): MutationPromise<DeleteDataData, undefined>;

interface DeleteDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteDataData, undefined>;
}
export const deleteDataRef: DeleteDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteData(dc: DataConnect): MutationPromise<DeleteDataData, undefined>;

interface DeleteDataRef {
  ...
  (dc: DataConnect): MutationRef<DeleteDataData, undefined>;
}
export const deleteDataRef: DeleteDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteDataRef:
```typescript
const name = deleteDataRef.operationName;
console.log(name);
```

### Variables
The `DeleteData` mutation has no variables.
### Return Type
Recall that executing the `DeleteData` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteDataData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteDataData {
  user_delete?: User_Key | null;
  category_delete?: Category_Key | null;
  blogPost_delete?: BlogPost_Key | null;
  form_delete?: Form_Key | null;
  formField_delete?: FormField_Key | null;
  formSubmission_delete?: FormSubmission_Key | null;
}
```
### Using `DeleteData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteData } from '@dataconnect/generated';


// Call the `deleteData()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteData();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteData(dataConnect);

console.log(data.user_delete);
console.log(data.category_delete);
console.log(data.blogPost_delete);
console.log(data.form_delete);
console.log(data.formField_delete);
console.log(data.formSubmission_delete);

// Or, you can use the `Promise` API.
deleteData().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
  console.log(data.category_delete);
  console.log(data.blogPost_delete);
  console.log(data.form_delete);
  console.log(data.formField_delete);
  console.log(data.formSubmission_delete);
});
```

### Using `DeleteData`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteDataRef } from '@dataconnect/generated';


// Call the `deleteDataRef()` function to get a reference to the mutation.
const ref = deleteDataRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteDataRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);
console.log(data.category_delete);
console.log(data.blogPost_delete);
console.log(data.form_delete);
console.log(data.formField_delete);
console.log(data.formSubmission_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
  console.log(data.category_delete);
  console.log(data.blogPost_delete);
  console.log(data.form_delete);
  console.log(data.formField_delete);
  console.log(data.formSubmission_delete);
});
```

