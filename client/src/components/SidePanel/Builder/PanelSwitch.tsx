import { useEffect, useMemo } from 'react';
import { defaultAssistantsVersion } from 'librechat-data-provider';
import type { Action, TEndpointsConfig, AssistantsEndpoint } from 'librechat-data-provider';
import type { ActionsEndpoint } from '~/common';
import {
  useGetActionsQuery,
  useGetEndpointsQuery,
  useGetAssistantDocsQuery,
} from '~/data-provider';
import AssistantPanel from './AssistantPanel';
import { useChatContext } from '~/Providers';
import ActionsPanel from './ActionsPanel';
import { Panel } from '~/common/panels';
import { usePanelContext } from '~/hooks/Panel/usePanelContext';

export default function PanelSwitch() {
  const { activePanel, setActivePanel } = usePanelContext();
  const { conversation, index } = useChatContext();
  const [action, setAction] = useMemo(() => [undefined, () => { }], []);
  const [currentAssistantId, setCurrentAssistantId] = useMemo(() => [undefined, () => { }], []);

  const { data: endpointsConfig = {} as TEndpointsConfig } = useGetEndpointsQuery();
  const { data: actions = [] } = useGetActionsQuery(conversation?.endpoint as ActionsEndpoint);
  const { data: documentsMap = null } = useGetAssistantDocsQuery(conversation?.endpoint ?? '', {
    select: (data) => new Map(data.map((dbA) => [dbA.assistant_id, dbA])),
  });

  const assistantsConfig = useMemo(
    () => endpointsConfig?.[conversation?.endpoint ?? ''],
    [conversation?.endpoint, endpointsConfig],
  );

  useEffect(() => {
    const currentId = conversation?.assistant_id ?? '';
    if (currentId) {
      setCurrentAssistantId(currentId);
    }
  }, [conversation?.assistant_id]);

  if (!conversation?.endpoint) {
    return <div>No endpoint</div>;
  }

  const version = assistantsConfig?.version ?? defaultAssistantsVersion[conversation.endpoint];

  if (activePanel === Panel.actions || action) {
    return (
      <ActionsPanel
        index={index}
        action={action}
        actions={actions}
        setAction={setAction}
        activePanel={activePanel}
        documentsMap={documentsMap}
        setActivePanel={setActivePanel}
        assistant_id={currentAssistantId}
        setCurrentAssistantId={setCurrentAssistantId}
        endpoint={conversation.endpoint as AssistantsEndpoint}
        version={version}
      />
    );
  }

  if (activePanel === Panel.builder || activePanel === Panel.assistant) {
    return (
      <AssistantPanel
        index={index}
        activePanel={activePanel}
        action={action}
        actions={actions}
        setAction={setAction}
        documentsMap={documentsMap}
        setActivePanel={setActivePanel}
        assistant_id={currentAssistantId}
        setCurrentAssistantId={setCurrentAssistantId}
        endpoint={conversation.endpoint as AssistantsEndpoint}
        assistantsConfig={assistantsConfig}
        version={version}
      />
    );
  }

  return <div>Panel not handled</div>;
}
