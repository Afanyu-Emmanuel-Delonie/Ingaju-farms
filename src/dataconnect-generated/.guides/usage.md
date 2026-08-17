# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateData, useUpdateData, useDeleteData, useReadData, useListData } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateData();

const { data, isPending, isSuccess, isError, error } = useUpdateData();

const { data, isPending, isSuccess, isError, error } = useDeleteData();

const { data, isPending, isSuccess, isError, error } = useReadData();

const { data, isPending, isSuccess, isError, error } = useListData();

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createData, updateData, deleteData, readData, listData } from '@dataconnect/generated';


// Operation CreateData: 
const { data } = await CreateData(dataConnect);

// Operation UpdateData: 
const { data } = await UpdateData(dataConnect);

// Operation DeleteData: 
const { data } = await DeleteData(dataConnect);

// Operation ReadData: 
const { data } = await ReadData(dataConnect);

// Operation ListData: 
const { data } = await ListData(dataConnect);


```