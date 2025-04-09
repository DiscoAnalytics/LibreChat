import { createContext, useContext } from 'react';

export enum Panel {
    assistant = 'assistant',
}

interface PanelContextType {
    activePanel: Panel | null;
    setActivePanel: (panel: Panel | null) => void;
}

export const PanelContext = createContext<PanelContextType>({
    activePanel: null,
    setActivePanel: () => { },
});

export const usePanelContext = () => useContext(PanelContext);
