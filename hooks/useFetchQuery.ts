import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const uri = "https://pokeapi.co/api/v2/";

export function useFetchQuery(path: string) {
  return useQuery({
    queryKey: [path],
    queryFn: async () => {
      await waitFunction(1);
      return fetch(uri + path).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      });
    },
  });
}

export function useInfiniteFetchQuery(path: string) {
  return useInfiniteQuery({
    queryKey: [path],
    initialPageParam: uri + path,
    queryFn: async ({ pageParam }) => {
      await waitFunction(1);
      return fetch(pageParam, {
        headers: {
          "Content-type": "Application/json",
          Accept: "application/json",
        },
      }).then((res) => res.json());
    },
    getNextPageParam: (lastPage) => {
      if ("next" in lastPage) {
        return lastPage.next;
      }
      return null;
    },
  });
}

function waitFunction(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration * 1000));
}
