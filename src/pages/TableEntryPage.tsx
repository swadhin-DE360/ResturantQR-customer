import React from 'react';
import { useParams } from 'react-router-dom';
import tablesData from '@/data/tables.json';
import { TableInfo } from '@/types';
import { IdentifiedTablePage } from './IdentifiedTablePage';
import { InvalidTablePage } from './InvalidTablePage';
import { UnavailableTablePage } from './UnavailableTablePage';

/**
 * Dynamic Route Controller for /menu/:tableToken
 * Validates scanned table tokens against static JSON tables and renders the corresponding view
 */
export const TableEntryPage: React.FC = () => {
  const { tableToken } = useParams<{ tableToken: string }>();

  const tables = tablesData as TableInfo[];
  const normalizedToken = (tableToken || '').trim().toUpperCase();
  const matchedTable = tables.find(
    (t) =>
      t.tableNumber.toUpperCase() === normalizedToken ||
      (t.qrToken && t.qrToken.toUpperCase() === normalizedToken) ||
      t.id.toUpperCase() === normalizedToken
  );

  if (!matchedTable) {
    return <InvalidTablePage scannedToken={tableToken} />;
  }

  if (matchedTable.status === 'Inactive') {
    return <UnavailableTablePage table={matchedTable} scannedToken={tableToken} />;
  }

  return <IdentifiedTablePage table={matchedTable} />;
};
