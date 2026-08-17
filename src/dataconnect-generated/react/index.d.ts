import { CreateDataData, UpdateDataData, DeleteDataData, ReadDataData, ListDataData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateData(options?: useDataConnectMutationOptions<CreateDataData, FirebaseError, void>): UseDataConnectMutationResult<CreateDataData, undefined>;
export function useCreateData(dc: DataConnect, options?: useDataConnectMutationOptions<CreateDataData, FirebaseError, void>): UseDataConnectMutationResult<CreateDataData, undefined>;

export function useUpdateData(options?: useDataConnectMutationOptions<UpdateDataData, FirebaseError, void>): UseDataConnectMutationResult<UpdateDataData, undefined>;
export function useUpdateData(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateDataData, FirebaseError, void>): UseDataConnectMutationResult<UpdateDataData, undefined>;

export function useDeleteData(options?: useDataConnectMutationOptions<DeleteDataData, FirebaseError, void>): UseDataConnectMutationResult<DeleteDataData, undefined>;
export function useDeleteData(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteDataData, FirebaseError, void>): UseDataConnectMutationResult<DeleteDataData, undefined>;

export function useReadData(options?: useDataConnectQueryOptions<ReadDataData>): UseDataConnectQueryResult<ReadDataData, undefined>;
export function useReadData(dc: DataConnect, options?: useDataConnectQueryOptions<ReadDataData>): UseDataConnectQueryResult<ReadDataData, undefined>;

export function useListData(options?: useDataConnectQueryOptions<ListDataData>): UseDataConnectQueryResult<ListDataData, undefined>;
export function useListData(dc: DataConnect, options?: useDataConnectQueryOptions<ListDataData>): UseDataConnectQueryResult<ListDataData, undefined>;
