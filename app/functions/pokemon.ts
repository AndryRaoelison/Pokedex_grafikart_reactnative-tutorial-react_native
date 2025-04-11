export function getPokemonId(url: string): number {
  return parseInt(url.split("/").at(-2)!, 10);
}

export function getArtworklink(id: string | number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function getPokemonHeight(height: number): string {
  return (height * 10).toString() + "cm";
}
export function getPokemonWeight(weight: number): string {
  return (weight / 10).toString() + "kg";
}
