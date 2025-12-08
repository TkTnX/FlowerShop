import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../libs";
import type { IUser } from "../types";

export function useUser() {
      const { data, isPending, error } = useQuery({
        queryKey: ["user"],
        queryFn: async (): Promise<{user: IUser}> => {
          const res = await axiosInstance.get("/users/me");
          return res.data;
        },
      });
    
    return {
        user: data?.user,
        isPending,
        error
    }
}