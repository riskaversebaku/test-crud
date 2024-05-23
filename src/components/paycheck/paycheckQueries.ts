import { useMutation, useQuery } from '@tanstack/react-query';
import { getData, postData, putData, deleteData } from "./paycheckRequests";
import {EmployeeProps} from "./types";

enum queryKeys {
    getData = 'getData',
    postData = 'postData',
    putData = 'putData',
    deleteData = 'deleteData',
}

export const useGetData = () => {
    return useQuery({
        queryKey: [queryKeys.getData],
        queryFn: getData,
    });
}

export const usePostData = () => {
    return useMutation({
        mutationKey: [queryKeys.postData],
        mutationFn: postData
    })
}

export const usePutData = () => {
    return useMutation({
        mutationKey: [queryKeys.putData],
        mutationFn: async ({ id, data }: { id: EmployeeProps['id'], data: EmployeeProps }) => {
            await putData(id, data)
        }
    })
}

export const useDeleteData = () => {
    return useMutation({
        mutationKey: [queryKeys.deleteData],
        mutationFn: async (id: EmployeeProps['id']) => {
            await deleteData(id)
        }
    })
}