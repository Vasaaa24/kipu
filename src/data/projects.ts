/**
 * Realizace – všechna data na jednom místě.
 *
 * Přidání fotky: nahrajte soubor do /public/images/realizace/
 * a vyplňte `image: { src: "/images/realizace/nazev.jpg", alt: "Popis fotky" }`.
 * Bez `image` se zobrazí elegantní placeholder.
 *
 * `placeholder: true` = ilustrační ukázka (zobrazí štítek „Ukázka“).
 * U skutečných realizací tento příznak smažte.
 */

export type ProjectCategory = "elektro" | "stavebni";

export type Project = {
  id: string;
  category: ProjectCategory;
  title: string;
  location: string;
  year: number | string;
  description: string;
  image?: { src: string; alt: string };
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    id: "elektro-byt-rekonstrukce",
    category: "elektro",
    title: "Rekonstrukce elektroinstalace bytu",
    location: "Praha – DOPLNIT",
    year: "DOPLNIT",
    description: "Výměna rozvodů, nový rozvaděč a osvětlení. [Popis k doplnění]",
    placeholder: true,
  },
  {
    id: "elektro-rodinny-dum",
    category: "elektro",
    title: "Elektroinstalace rodinného domu",
    location: "DOPLNIT",
    year: "DOPLNIT",
    description: "Kompletní silnoproudá a slaboproudá instalace novostavby. [Popis k doplnění]",
    placeholder: true,
  },
  {
    id: "elektro-komercni-prostor",
    category: "elektro",
    title: "Elektromontáže v komerčním prostoru",
    location: "Praha – DOPLNIT",
    year: "DOPLNIT",
    description: "Úprava rozvodů a osvětlení provozovny. [Popis k doplnění]",
    placeholder: true,
  },
  {
    id: "elektro-rozvadec",
    category: "elektro",
    title: "Výměna rozvaděče",
    location: "DOPLNIT",
    year: "DOPLNIT",
    description: "Montáž nového rozvaděče s jištěním okruhů. [Popis k doplnění]",
    placeholder: true,
  },
  {
    id: "stavebni-zapraveni",
    category: "stavebni",
    title: "Zapravení drážek po elektroinstalaci",
    location: "Praha – DOPLNIT",
    year: "DOPLNIT",
    description: "Zapravení drážek, oprava omítek a výmalba. [Popis k doplnění]",
    placeholder: true,
  },
  {
    id: "stavebni-sdk",
    category: "stavebni",
    title: "Sádrokartonový podhled pro osvětlení",
    location: "DOPLNIT",
    year: "DOPLNIT",
    description: "Podhled s připravenými otvory pro vestavná svítidla. [Popis k doplnění]",
    placeholder: true,
  },
];
