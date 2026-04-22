import { battambangDestinations } from "./battambang-destinations";
import { kampotDestinations } from "./kampot-destinations";
import { kepDestinations } from "./kep-destinations";
import { kohkongDestinations } from "./kohkong-destinations";
import { mondulkiriDestinations } from "./mondulkiri-destinations";
import { pailinDestinations } from "./pailin-destinations";
import { phnompenhDestinations } from "./phnompenh-destinations";
import { ratanakiriDestinations } from "./ratanakiri-destinations";
import { siemreapDestinations } from "./siemreap-destinations";
import { sihanoukvilleDestinations } from "./sihanoukville-destinations";

const addProvince = (destinations, provinceName) => 
  destinations.map(d => ({ ...d, province: provinceName }));

export const allDestinations = [
  ...addProvince(battambangDestinations, "Battambang"),
  ...addProvince(kampotDestinations, "Kampot"),
  ...addProvince(kepDestinations, "Kep"),
  ...addProvince(kohkongDestinations, "Koh Kong"),
  ...addProvince(mondulkiriDestinations, "Mondulkiri"),
  ...addProvince(pailinDestinations, "Pailin"),
  ...addProvince(phnompenhDestinations, "Phnom Penh"),
  ...addProvince(ratanakiriDestinations, "Ratanakiri"),
  ...addProvince(siemreapDestinations, "Siem Reap"),
  ...addProvince(sihanoukvilleDestinations, "Sihanoukville"),
];
