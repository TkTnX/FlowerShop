import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../libs";

export function useUser() {
      const { data, isPending, error } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
          const res = await axiosInstance.get("/users/me");
          return res.data;
        },
      });
    
    return {
        user: data,
        isPending,
        error
    }
}