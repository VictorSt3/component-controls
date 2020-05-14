import React, { FC, MouseEvent } from 'react';
import { Button, ButtonProps, useThemeUI } from 'theme-ui';
import { Collapsible } from '../Collapsible';
import { Tab, Tabs, TabList, TabPanel } from '../Tabs';
import { getSortedPanels, ActionItems, ActionItem } from '../ActionBar';
import { ActionContainer, ActionContainerProps } from '../ActionContainer';

export const IconButton = (props: ButtonProps) => (
  <Button style={{ paddingTop: '3px', paddingBottom: '3px' }} {...props} />
);

export type BackgroundType = 'dark' | 'light';

export type DirectionType = 'ltr' | 'rtl';

export interface PanelContainerOwnProps {
  /**
   * by default, which tab to have open.
   */
  openTab?: React.ReactNode;

  /**
   * if true, the tabs on the panels will be visible
   */
  visibleTabs?: boolean;

  /**
   * background pattern type
   */
  background?: BackgroundType;

  /**
   * direction type
   */
  direction?: DirectionType;
}
export type PanelContainerProps = PanelContainerOwnProps & ActionContainerProps;

/**
 * an action container with built-in collapsible panels
 *
 */
export const PanelContainer: FC<PanelContainerProps> = ({
  actions = [],
  children,
  openTab,
  visibleTabs = false,
  background,
  direction,
  ...rest
}) => {
  const [tabsIndex, setTabsIndex] = React.useState<number | undefined>(
    undefined,
  );
  const { theme } = useThemeUI();

  const panels: ActionItems = getSortedPanels(actions);

  React.useEffect(() => {
    const index = panels.findIndex(
      (p: ActionItem) => p.id === openTab || p.title === openTab,
    );
    setTabsIndex(index > -1 ? index : undefined);
  }, [openTab, actions]);
  const panelActions = React.useMemo(
    () =>
      actions.map((panel: ActionItem) => {
        const index = panels.findIndex((p: ActionItem) => p.id === panel.id);
        return panel.panel
          ? {
              ...panel,
              title: `${tabsIndex === index ? 'close' : 'open'} ${panel.title}`,
              onClick: (e: MouseEvent<HTMLButtonElement>) => {
                if (index < 0) {
                  return undefined;
                }
                if (tabsIndex === index) {
                  setTabsIndex(undefined);
                } else {
                  if (panel.onClick) {
                    const ret = panel.onClick(e);
                    if (ret === true) {
                      setTabsIndex(index);
                      return ret;
                    } else if (ret === false) {
                      setTabsIndex(undefined);
                      return ret;
                    }
                  }
                  setTabsIndex(index);
                }
                return undefined;
              },
            }
          : panel;
      }),
    [actions, tabsIndex],
  );

  const style: React.CSSProperties = {
    direction,
  };
  if (background) {
    style.backgroundColor =
      background === 'light'
        ? theme.colors?.background
        : theme.colors?.modes?.dark?.background;
    style.backgroundImage =
      'linear-gradient(rgba(232,234,232,.3) 2px, transparent 2px), linear-gradient(90deg, rgba(232,234,232,.3) 2px, transparent 2px), linear-gradient(rgba(232,234,232,.3) 1px, transparent 0px), linear-gradient(90deg, rgba(232,234,232,.3) 1px, transparent 1px)';
    style.backgroundSize = '20px 20px';
  }
  return (
    <ActionContainer plain={false} actions={panelActions} {...rest}>
      <div style={style}>{children}</div>
      <Collapsible isOpen={tabsIndex !== undefined}>
        {panels.length === 1 ? (
          panels[0].panel
        ) : (
          <Tabs
            selectedIndex={tabsIndex || 0}
            onSelect={(index: number) => setTabsIndex(index)}
          >
            <TabList
              hidden={!visibleTabs}
              style={{
                textAlign: 'right',
              }}
            >
              {panels.map((panel: ActionItem) => (
                <Tab key={`playground_tab_${panel.title}`}>{panel.title}</Tab>
              ))}
            </TabList>
            {panels.map((panel: ActionItem) => (
              <TabPanel key={`playground_panel_${panel.title}`}>
                {panel.panel}
              </TabPanel>
            ))}
          </Tabs>
        )}
      </Collapsible>
    </ActionContainer>
  );
};