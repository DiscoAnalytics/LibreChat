import React, { useState } from 'react';
import { generateSystemPrompt } from '~/utils/generateSystemPrompt';
import mockUsers from '~/data/mockUsers';

export default function AssistantPanel() {
    const currentUser = mockUsers[0]; // Replace with real user when auth is ready
    const defaultPrompt = generateSystemPrompt(currentUser);

    const [prompt, setPrompt] = useState(defaultPrompt);
    const [isEdited, setIsEdited] = useState(false);

    const handleSave = () => {
        console.log('Saved prompt:', prompt);
        setIsEdited(false);
    };

    const handleReset = () => {
        setPrompt(defaultPrompt);
        setIsEdited(false);
    };

    return (
        <div className="h-auto max-w-full overflow-x-hidden p-3">
            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold mb-2">MCS Assistant Setup</h2>
                    <p className="text-sm text-muted-foreground">
                        This is your personal MCS system prompt. You can tailor how the AI assistant behaves when interacting with you.
                    </p>
                </div>

                <textarea
                    className="w-full border border-border rounded p-2 text-sm bg-background text-foreground dark:bg-gray-700 dark:border-gray-600"
                    rows={6}
                    value={prompt}
                    onChange={(e) => {
                        setPrompt(e.target.value);
                        setIsEdited(true);
                    }}
                />

                <div className="flex justify-between gap-2">
                    <button
                        onClick={handleReset}
                        className="btn btn-neutral flex-1 px-4 py-2 text-sm"
                        disabled={!isEdited}
                    >
                        Reset to Default
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-[#006EB9] hover:bg-[#005A99] text-white font-semibold py-2 px-4 rounded text-sm transition"
                        disabled={!isEdited}
                    >
                        Save Prompt
                    </button>
                </div>
            </div>
        </div>
    );
}
