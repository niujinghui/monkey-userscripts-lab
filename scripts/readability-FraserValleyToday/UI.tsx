import React from "react";
import { ReaderModeButton } from "@shared/UI/reader-mode-button";

interface UIProps {
    isReaderMode: boolean;
    onToggle: () => void;
}

export const UI = ({ isReaderMode, onToggle }: UIProps) => {
    return <ReaderModeButton enabled={isReaderMode} onClick={onToggle} />;
};
