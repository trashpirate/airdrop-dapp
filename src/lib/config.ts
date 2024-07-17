import { http, createConfig } from "@wagmi/core";
import { getDefaultConfig } from "connectkit";
import { cookieStorage, createStorage } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";

import {
  PROJECT_NAME,
  PROJECT_DESCRIPTION,
  PROJECT_URL,
  PROJECT_ICON,
} from "./metadata";

function getWagmiConfig() {
  if (process.env.NEXT_PUBLIC_ENABLE_TESTNET == "true") {
    return getDefaultConfig({
      // Your dApps chains
      chains: [baseSepolia],
      transports: {
        // RPC URL for each chain
        [baseSepolia.id]: http(
          `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
        ),
      },
      storage: createStorage({
        storage: cookieStorage,
      }),
      ssr: true,
      appName: PROJECT_NAME,
      walletConnectProjectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,

      // Optional App Info
      appDescription: PROJECT_DESCRIPTION,
      appUrl: PROJECT_URL, // your app's url
      appIcon: PROJECT_ICON, // your app's icon, no bigger than 1024x1024px (max. 1MB)
    });
  } else {
    return getDefaultConfig({
      // Your dApps chains
      chains: [base],
      transports: {
        // RPC URL for each chain
        [base.id]: http(
          `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
        ),
      },
      storage: createStorage({
        storage: cookieStorage,
      }),
      ssr: true,
      appName: PROJECT_NAME,
      walletConnectProjectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,

      // Optional App Info
      appDescription: PROJECT_DESCRIPTION,
      appUrl: PROJECT_URL, // your app's url
      appIcon: PROJECT_ICON, // your app's icon, no bigger than 1024x1024px (max. 1MB)
    });
  }
}

export const config = createConfig(getWagmiConfig());
