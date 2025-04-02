import { useQuery } from "@tanstack/react-query";

export function useFetchQuery(path: string) {
  const uri = "https://pokeapi.co/api/v2/";
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

function waitFunction(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration * 1000));
}
