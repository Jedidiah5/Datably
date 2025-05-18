"use client";

import React, { useState, useMemo } from 'react';
import type { UserDataItem } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface UserDataTableProps {
  data: UserDataItem[];
}

type SortKey = keyof UserDataItem | null;
type SortDirection = 'asc' | 'desc';

export function UserDataTable({ data }: UserDataTableProps) {
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const filteredData = useMemo(() => {
    let tableData = [...data];
    if (filter) {
      tableData = tableData.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(filter.toLowerCase())
        )
      );
    }

    if (sortKey) {
      tableData.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA === null || valA === undefined) return sortDirection === 'asc' ? -1 : 1;
        if (valB === null || valB === undefined) return sortDirection === 'asc' ? 1 : -1;

        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortDirection === 'asc' ? valA - valB : valB - valA;
        }
        // Fallback for other types or mixed types (e.g. date strings)
        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();
        return sortDirection === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
      });
    }
    return tableData;
  }, [data, filter, sortKey, sortDirection]);

  const handleSort = (key: keyof UserDataItem) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (key: keyof UserDataItem) => {
    if (sortKey === key) {
      return sortDirection === 'asc' ? <ArrowUpDown className="ml-2 h-4 w-4 inline text-primary" /> : <ArrowUpDown className="ml-2 h-4 w-4 inline text-primary" />;
    }
    return <ArrowUpDown className="ml-2 h-4 w-4 inline opacity-50" />;
  };
  
  const getStatusBadgeVariant = (status: UserDataItem['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Active': return 'default'; // Using primary for active as per theme. Green would be better for success.
      case 'Inactive': return 'secondary';
      case 'Pending': return 'outline';
      default: return 'outline';
    }
  };


  return (
    <Card className="shadow-lg col-span-1 md:col-span-2 xl:col-span-3 hover:shadow-xl transition-all duration-300 hover:scale-[1.01] animate-fadeIn">
      <CardHeader>
        <CardTitle className="font-heading">User Data</CardTitle>
        <CardDescription>Overview of registered users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center">
          <Search className="absolute ml-3 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Filter users..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10 w-full md:w-1/3"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {(['fullName', 'email', 'registrationDate', 'status'] as Array<keyof UserDataItem>).map((key) => (
                  <TableHead key={key}>
                    <Button variant="ghost" onClick={() => handleSort(key)} className="p-0 hover:bg-transparent">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} {/* Add space before capital letters for display */}
                      {getSortIcon(key)}
                    </Button>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.fullName}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{new Date(item.registrationDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(item.status)} 
                       className={item.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                                  item.status === 'Inactive' ? 'bg-slate-500/20 text-slate-400 border-slate-500/30' :
                                  'bg-amber-500/20 text-amber-400 border-amber-500/30'}>
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
