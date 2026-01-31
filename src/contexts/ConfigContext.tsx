
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as staticContent from "@/data/content"; // Fallback static content
import { hydrateAll } from "@/utils/contentHydration";

// Define the shape of our config based on the static export type
type ConfigType = typeof staticContent;

interface ConfigContextType {
    config: ConfigType;
    refreshConfig: (force?: boolean) => Promise<ConfigType | null>;
}

const ConfigContext = createContext<ConfigContextType>({
    config: staticContent,
    refreshConfig: async () => null,
});

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
    const [config, setConfig] = useState<ConfigType>(staticContent);

    useEffect(() => {
        // Initial splash log for dev transparency
        console.log("⚡ Starting configuration hydration...");
        refreshConfig(true);
    }, []);

    const refreshConfig = async (force: boolean = false): Promise<ConfigType | null> => {
        try {
            // Check cache (5 minutes)
            const CACHE_KEY = 'site_config_cache';
            const CACHE_DURATION = 5 * 60 * 1000;
            const cached = localStorage.getItem(CACHE_KEY);

            if (!force && cached) {
                const { timestamp, data } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    console.log("Using cached configuration.");
                    return hydrateAndSet(data);
                }
            }

            // Prefer Remote Override if provided, else fallback to static
            const REMOTE_URL = process.env.NEXT_PUBLIC_REMOTE_CONFIG_URL;

            if (!REMOTE_URL) {
                console.log("Using local static configuration.");
                return config;
            }

            console.log(`Syncing from remote: ${REMOTE_URL}`);
            const res = await fetch(`${REMOTE_URL}?t=${Date.now()}`);

            if (!res.ok) throw new Error(`Server returned ${res.status}: ${res.statusText}`);
            const rawData = await res.json();

            // Cache the raw data
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                data: rawData
            }));

            console.log("✅ Configuration successfully synced from remote.");
            return hydrateAndSet(rawData);
        } catch (err) {
            console.warn("⚠️ Remote sync failed. Using local static content.", err);
            return config;
        }
    };

    const hydrateAndSet = (rawData: any) => {
        const hydratedData = hydrateAll(rawData);
        const nextConfig = {
            ...staticContent, // Base static stuff (icons, etc)
            ...hydratedData
        } as ConfigType;

        setConfig(nextConfig);
        return nextConfig;
    };

    return (
        <ConfigContext.Provider value={{ config, refreshConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};
