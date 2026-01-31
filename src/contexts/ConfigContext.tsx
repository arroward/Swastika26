
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as staticContent from "@/data/content"; // Fallback static content
import { hydrateAll } from "@/utils/contentHydration";

// Define the shape of our config based on the static export type
type ConfigType = typeof staticContent;

interface ConfigContextType {
    config: ConfigType;
    refreshConfig: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextType>({
    config: staticContent,
    refreshConfig: async () => { },
});

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
    const [config, setConfig] = useState<ConfigType>(staticContent);

    useEffect(() => {
        // Initial splash log for dev transparency
        console.log("⚡ Starting configuration hydration...");
        refreshConfig(true);
    }, []);

    const refreshConfig = async (force: boolean = false) => {
        try {
            // Check cache (5 minutes)
            const CACHE_KEY = 'site_config_cache';
            const CACHE_DURATION = 5 * 60 * 1000;
            const cached = localStorage.getItem(CACHE_KEY);

            if (!force && cached) {
                const { timestamp, data } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    console.log("Using cached configuration.");
                    hydrateAndSet(data);
                    return;
                }
            }

            // Prefer Remote Override if provided, else fallback to static
            const REMOTE_URL = process.env.NEXT_PUBLIC_REMOTE_CONFIG_URL;

            if (!REMOTE_URL) {
                console.log("Using local static configuration.");
                return;
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

            hydrateAndSet(rawData);
            console.log("✅ Configuration successfully synced from remote.");
        } catch (err) {
            console.warn("⚠️ Remote sync failed. Using local static content.", err);
        }
    };

    const hydrateAndSet = (rawData: any) => {
        const hydratedData = hydrateAll(rawData);
        setConfig(prev => ({
            ...prev,
            ...hydratedData
        }));
    };

    return (
        <ConfigContext.Provider value={{ config, refreshConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};
