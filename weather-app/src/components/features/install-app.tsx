'use client';

import { Download } from 'lucide-react';
import { usePwaInstall } from '@/hooks/use-pwa-install';
import { motion, AnimatePresence } from 'framer-motion';

export function InstallApp() {
    const { isInstallable, installApp } = usePwaInstall();

    return (
        <AnimatePresence>
            {isInstallable && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    onClick={installApp}
                    className="fixed bottom-6 right-6 z-50 bg-white text-black px-5 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2 hover:bg-slate-100 active:scale-95 transition-all"
                >
                    <Download className="w-5 h-5" />
                    Cài App
                </motion.button>
            )}
        </AnimatePresence>
    );
}
