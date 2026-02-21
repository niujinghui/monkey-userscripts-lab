import React from "react";
import { ReaderModeButton } from "@shared/UI/reader-mode-button";

interface AppProps {
    isReaderMode: boolean;
    onToggle: () => void;
}

export const App = ({ isReaderMode, onToggle }: AppProps) => {
    return <ReaderModeButton enabled={isReaderMode} onClick={onToggle} />;
};
