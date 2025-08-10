import React, { createContext, useContext, useMemo, useReducer } from "react";
import heroImg from "@/assets/hero-agrochain.jpg";
import coffeeImg from "@/assets/equip-coffee-facility-colombia.jpg";
import combineImg from "@/assets/equip-combine-brazil.jpg";
import irrigImg from "@/assets/equip-irrigation-mexico.jpg";
import avocadoImg from "@/assets/equip-avocado-plant-peru.jpg";

export type Equipment = {
  id: string;
  name: string;
  location: string; // City/Region, Country
  image: string;
  priceUSD: number;
  tokenSupply: number;
  tokensSold: number;
  specs: string[];
  projectedAPY: number; // %
  revenueModel: string;
  gps?: { lat: number; lng: number };
  usageHours?: number; // total usage hours
};

export type Ownership = {
  equipmentId: string;
  tokenAmount: number; // number of tokens owned
  lastPayoutUSD: number;
  lifetimeReturnsUSD: number;
};

export type Proposal = {
  id: string;
  equipmentId: string;
  title: string;
  description: string;
  options: string[];
  votes: Record<string, number>; // option -> votes
  status: "active" | "closed";
};

export type AppState = {
  equipments: Equipment[];
  ownerships: Ownership[];
  proposals: Proposal[];
  txLog: { id: string; memo: string; amountUSD?: number; hash: string; ts: number }[];
};

const initialState: AppState = {
  equipments: [
    {
      id: "eq-coffee-colombia",
      name: "Coffee Processing Facility",
      location: "Pitalito, Huila, Colombia",
      image: coffeeImg,
      priceUSD: 150_000,
      tokenSupply: 1500,
      tokensSold: 620,
      projectedAPY: 12.5,
      specs: [
        "Stainless wet mill line (2,000 kg/h)",
        "Fermentation tanks (5 x 3,000 L)",
        "Mechanical dryers (Guardiola, 2 units)",
        "Optical sorter & density tables"
      ],
      revenueModel: "10% fee on processed lot value + fixed rental per ton",
      gps: { lat: 1.853, lng: -76.047 },
      usageHours: 382,
    },
    {
      id: "eq-combine-brazil",
      name: "John Deere S780 Combine Harvester",
      location: "Sorriso, Mato Grosso, Brazil",
      image: combineImg,
      priceUSD: 400_000,
      tokenSupply: 4000,
      tokensSold: 2410,
      projectedAPY: 15.2,
      specs: [
        "PowerTech PSS 13.5L, 473 hp",
        "Header: 35 ft draper",
        "Grain tank: 14,100 L",
        "Yield & moisture sensors, auto-steer"
      ],
      revenueModel: "Hourly rental + 1.5% of harvest lots serviced",
      gps: { lat: -12.542, lng: -55.721 },
      usageHours: 1260,
    },
    {
      id: "eq-irrigation-mexico",
      name: "Center-Pivot Irrigation System",
      location: "Culiacán, Sinaloa, Mexico",
      image: irrigImg,
      priceUSD: 80_000,
      tokenSupply: 800,
      tokensSold: 410,
      projectedAPY: 10.4,
      specs: [
        "Span length: 400 m",
        "Nozzles: Low-pressure sprinklers",
        "Pump: 75 kW, variable frequency",
        "Telemetry: Flow & pressure monitoring"
      ],
      revenueModel: "Monthly subscription per hectare irrigated",
      gps: { lat: 24.806, lng: -107.394 },
      usageHours: 540,
    },
    {
      id: "eq-avocado-peru",
      name: "Avocado Processing Plant",
      location: "Virú, La Libertad, Peru",
      image: avocadoImg,
      priceUSD: 200_000,
      tokenSupply: 2000,
      tokensSold: 980,
      projectedAPY: 13.1,
      specs: [
        "Washer & brush polisher (10 t/h)",
        "Grading & packing line",
        "Hydrocooler tunnel",
        "Cold storage integration"
      ],
      revenueModel: "Throughput-based fee per crate processed",
      gps: { lat: -8.405, lng: -78.747 },
      usageHours: 720,
    },
  ],
  ownerships: [],
  proposals: [
    {
      id: "pr-1",
      equipmentId: "eq-combine-brazil",
      title: "Maintenance Budget Increase (Seasonal)",
      description: "Increase preventive maintenance budget by 8% ahead of soybean harvest.",
      options: ["Approve", "Reject", "Defer"],
      votes: { Approve: 52, Reject: 11, Defer: 7 },
      status: "active",
    },
  ],
  txLog: [],
};

/* Mock Stellar/Soroban integration */
function mockTxHash() {
  const alphabet = "abcdef0123456789";
  let s = "0x";
  for (let i = 0; i < 64; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return s;
}

/* Actions */
type Action =
  | { type: "MINT_TOKENS"; equipmentId: string; amount: number }
  | { type: "BUY_TOKENS"; equipmentId: string; amount: number }
  | { type: "ADD_EQUIPMENT"; payload: Equipment }
  | { type: "CAST_VOTE"; proposalId: string; option: string }
  | { type: "IOT_TICK"; equipmentId: string; dHours: number; dLat: number; dLng: number };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "MINT_TOKENS": {
      const equipments = state.equipments.map((e) =>
        e.id === action.equipmentId ? { ...e, tokenSupply: e.tokenSupply + action.amount } : e
      );
      return {
        ...state,
        equipments,
        txLog: [
          { id: crypto.randomUUID(), memo: `Mint ${action.amount} tokens`, hash: mockTxHash(), ts: Date.now() },
          ...state.txLog,
        ],
      };
    }
    case "BUY_TOKENS": {
      const equipments = state.equipments.map((e) =>
        e.id === action.equipmentId
          ? { ...e, tokensSold: Math.min(e.tokensSold + action.amount, e.tokenSupply) }
          : e
      );
      const price = state.equipments.find((e) => e.id === action.equipmentId)?.priceUSD ?? 0;
      const perToken = price / (state.equipments.find((e) => e.id === action.equipmentId)?.tokenSupply || 1);
      const purchaseUSD = perToken * action.amount;

      // add/merge ownership
      const existing = state.ownerships.find((o) => o.equipmentId === action.equipmentId);
      const ownerships = existing
        ? state.ownerships.map((o) =>
            o.equipmentId === action.equipmentId
              ? { ...o, tokenAmount: o.tokenAmount + action.amount, lifetimeReturnsUSD: o.lifetimeReturnsUSD }
              : o
          )
        : [
            ...state.ownerships,
            { equipmentId: action.equipmentId, tokenAmount: action.amount, lastPayoutUSD: 0, lifetimeReturnsUSD: 0 },
          ];

      return {
        ...state,
        equipments,
        ownerships,
        txLog: [
          { id: crypto.randomUUID(), memo: `Buy ${action.amount} tokens`, amountUSD: purchaseUSD, hash: mockTxHash(), ts: Date.now() },
          ...state.txLog,
        ],
      };
    }
    case "ADD_EQUIPMENT": {
      return { ...state, equipments: [{ ...action.payload }, ...state.equipments] };
    }
    case "CAST_VOTE": {
      const proposals = state.proposals.map((p) =>
        p.id === action.proposalId ? { ...p, votes: { ...p.votes, [action.option]: (p.votes[action.option] || 0) + 1 } } : p
      );
      return {
        ...state,
        proposals,
        txLog: [
          { id: crypto.randomUUID(), memo: `Vote cast: ${action.option}`, hash: mockTxHash(), ts: Date.now() },
          ...state.txLog,
        ],
      };
    }
    case "IOT_TICK": {
      const equipments = state.equipments.map((e) =>
        e.id === action.equipmentId && e.gps
          ? {
              ...e,
              usageHours: (e.usageHours || 0) + action.dHours,
              gps: { lat: e.gps.lat + action.dLat, lng: e.gps.lng + action.dLng },
            }
          : e
      );
      return { ...state, equipments };
    }
    default:
      return state;
  }
}

const AgroChainContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AgroChainProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AgroChainContext.Provider value={value}>{children}</AgroChainContext.Provider>;
}

export function useAgroChain() {
  const ctx = useContext(AgroChainContext);
  if (!ctx) throw new Error("useAgroChain must be used within AgroChainProvider");
  return ctx;
}
