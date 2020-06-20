import React, { FC, createContext, useContext } from 'react';
import { Link, LinkProps } from 'theme-ui';

export type LinkClassType = React.FC<LinkProps>;
const LinkContext = createContext<LinkClassType>(Link);
export interface LinkContextProviderProps {
  linkClass: LinkClassType;
}
export const LinkContextProvider: FC<LinkContextProviderProps> = ({
  linkClass: LinkClass,
  children,
}) => {
  return (
    <LinkContext.Provider value={LinkClass}>{children}</LinkContext.Provider>
  );
};
export const useGetLinkClass = () => {
  return useContext(LinkContext) || Link;
};
