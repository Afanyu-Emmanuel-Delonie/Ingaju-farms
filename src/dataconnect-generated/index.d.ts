import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface BlogPost_Key {
  id: UUIDString;
  __typename?: 'BlogPost_Key';
}

export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface CreateDataData {
  user_insert: User_Key;
  category_insert: Category_Key;
  blogPost_insert: BlogPost_Key;
  form_insert: Form_Key;
  formField_insert: FormField_Key;
  formSubmission_insert: FormSubmission_Key;
}

export interface DeleteDataData {
  user_delete?: User_Key | null;
  category_delete?: Category_Key | null;
  blogPost_delete?: BlogPost_Key | null;
  form_delete?: Form_Key | null;
  formField_delete?: FormField_Key | null;
  formSubmission_delete?: FormSubmission_Key | null;
}

export interface FormField_Key {
  id: UUIDString;
  __typename?: 'FormField_Key';
}

export interface FormSubmission_Key {
  id: UUIDString;
  __typename?: 'FormSubmission_Key';
}

export interface Form_Key {
  id: UUIDString;
  __typename?: 'Form_Key';
}

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

export interface UpdateDataData {
  user_update?: User_Key | null;
  category_update?: Category_Key | null;
  blogPost_update?: BlogPost_Key | null;
  form_update?: Form_Key | null;
  formField_update?: FormField_Key | null;
  formSubmission_update?: FormSubmission_Key | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateDataData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateDataData, undefined>;
  operationName: string;
}
export const createDataRef: CreateDataRef;

export function createData(): MutationPromise<CreateDataData, undefined>;
export function createData(dc: DataConnect): MutationPromise<CreateDataData, undefined>;

interface UpdateDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateDataData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateDataData, undefined>;
  operationName: string;
}
export const updateDataRef: UpdateDataRef;

export function updateData(): MutationPromise<UpdateDataData, undefined>;
export function updateData(dc: DataConnect): MutationPromise<UpdateDataData, undefined>;

interface DeleteDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteDataData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteDataData, undefined>;
  operationName: string;
}
export const deleteDataRef: DeleteDataRef;

export function deleteData(): MutationPromise<DeleteDataData, undefined>;
export function deleteData(dc: DataConnect): MutationPromise<DeleteDataData, undefined>;

interface ReadDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ReadDataData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ReadDataData, undefined>;
  operationName: string;
}
export const readDataRef: ReadDataRef;

export function readData(options?: ExecuteQueryOptions): QueryPromise<ReadDataData, undefined>;
export function readData(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ReadDataData, undefined>;

interface ListDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDataData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListDataData, undefined>;
  operationName: string;
}
export const listDataRef: ListDataRef;

export function listData(options?: ExecuteQueryOptions): QueryPromise<ListDataData, undefined>;
export function listData(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListDataData, undefined>;

