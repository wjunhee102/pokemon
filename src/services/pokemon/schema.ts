import { z } from "zod";

const TypeSchema = z.object({
  name: z.string(),
  url: z.string(),
});

const NameUrlSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const BasedPokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  order: z.number(),
  types: z.array(
    z.object({
      slot: z.number(),
      type: TypeSchema,
    }),
  ),
  sprites: z.object({
    front_default: z.string(),
  }),
});

export const PokemonSpeciesSchema = z.object({
  color: NameUrlSchema,
  names: z.array(
    z.object({
      language: NameUrlSchema,
      name: z.string(),
    }),
  ),
  genera: z.array(
    z.object({
      genus: z.string(),
      language: NameUrlSchema,
    }),
  ),
  flavor_text_entries: z.array(
    z.object({
      flavor_text: z.string(),
      language: NameUrlSchema,
    }),
  ),
  evolution_chain: z.object({ url: z.string() }),
});

const EvolvesToSchema = z.object({
  species: NameUrlSchema,
  evolves_to: z.array(
    z.object({
      species: NameUrlSchema,
      evolves_to: z.array(
        z.object({
          species: NameUrlSchema,
          evolves_to: z.array(
            z.object({
              species: NameUrlSchema,
            }),
          ),
        }),
      ),
    }),
  ),
});

export const EvolutionChainSchema = z.object({
  chain: z.object({
    evolves_to: z.array(EvolvesToSchema),
  }),
});

export const PokemonTypeInfoSchema = z.object({
  name: z.string(),
  names: z.array(
    z.object({
      language: NameUrlSchema,
      name: z.string(),
    }),
  ),
  pokemon: z.array(
    z.object({
      pokemon: NameUrlSchema,
    }),
  ),
});

export const PokemonListSchema = z.object({
  count: z.number(),
  next: z.string(),
  previous: z.string().nullable(),
  results: z.array(NameUrlSchema),
});

export type NameUrlSchemaType = z.infer<typeof NameUrlSchema>;
export type BasedPokemonSchemaType = z.infer<typeof BasedPokemonSchema>;
export type PokemonSpeciesSchemaType = z.infer<typeof PokemonSpeciesSchema>;
export type EvolvesToSchemaType = z.infer<typeof EvolvesToSchema>;
export type EvolutionChainSchemaType = z.infer<typeof EvolutionChainSchema>;
export type PokemonTypeInfoSchemaType = z.infer<typeof PokemonTypeInfoSchema>;
export type PokemonListSchemaType = z.infer<typeof PokemonListSchema>;
