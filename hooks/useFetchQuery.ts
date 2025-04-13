import { Colors } from "@/constants/Colors";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const uri = "https://pokeapi.co/api/v2/";

type API = {
  "pokemon/[id]": {
    id: string;
    name: string;
    url: string;
    height: number;
    weight: number;
    moves: {
      move: { name: string };
    }[];
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
    cries: {
      latest: string;
    };
    types: {
      type: { name: keyof (typeof Colors)["type"] };
    }[];
  };
  "pokemon-species/[id]": {
    flavor_text_entries: {
      flavor_text: string;
      language: {
        name: string;
      };
    }[];
  };
};

export function useFetchQuery<T extends keyof API>(
  path: T,
  params?: Record<string, string | number>
) {
  const endpoint =
    uri +
    Object.entries(params ?? {}).reduce(
      (acc: string, [key, value]) =>
        acc.replaceAll(`[${key}]`, value.toString()),
      path
    );
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      await waitFunction(1);
      return fetch(endpoint).then((res) => {
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
