
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

            // Determine URL: Prefer Remote > Local
            const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
            const REMOTE_URL = process.env.NEXT_PUBLIC_REMOTE_CONFIG_URL;

            // Build fetch URL: Remote Override > R2 config/data.json > Local Public data.json
            let fetchUrl = `/data.json?t=${Date.now()}`;
            if (R2_PUBLIC_URL) {
                fetchUrl = `${R2_PUBLIC_URL}/config/data.json?t=${Date.now()}`;
            }
            if (REMOTE_URL) {
                fetchUrl = `${REMOTE_URL}?t=${Date.now()}`;
            }

            console.log(`Fetching config from: ${fetchUrl}`);
            const res = await fetch(fetchUrl);

            if (!res.ok) throw new Error(`Server returned ${res.status}: ${res.statusText}`);
            const rawData = await res.json();

            // Cache the raw data
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                data: rawData
            }));

            hydrateAndSet(rawData);
            console.log("✅ Configuration successfully synced from R2.");
        } catch (err) {
            console.warn("⚠️ Remote sync failed. Falling back to local static content.", err);
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
