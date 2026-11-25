import React from 'react';
import { TableInfo } from '@/types';
import { MenuHomePage } from './MenuHomePage';

export interface IdentifiedTablePageProps {
  table: TableInfo;
}

export const IdentifiedTablePage: React.FC<IdentifiedTablePageProps> = () => {
  return <MenuHomePage />;
};

export default IdentifiedTablePage;
