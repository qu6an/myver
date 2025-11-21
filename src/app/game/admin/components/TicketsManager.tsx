'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import { getWeekRanges } from '../shared/getWeekRanges';

type Ticket = {
  id: number;
  created_at: string;
  number: string | null;
  user_email: string | null;
};

const TicketsManager = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [weekOptions, setWeekOptions] = useState<string[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<string>('');
  const supabase = createClient();

  useEffect(() => {
    const weekRanges = getWeekRanges();
    setWeekOptions(weekRanges);
    setSelectedWeek(weekRanges[0]);
  }, []);

  useEffect(() => {
    if (selectedWeek) {
      fetchTickets(selectedWeek);
    }
  }, [selectedWeek]);

  const fetchTickets = async (week: string) => {
    setLoading(true);
    const [startDate, endDate] = week.split('_');

    const { data, error } = await supabase
      .schema('game')
      .from('tickets')
      .select('id, created_at, number, user_email')
      .gte('created_at', startDate)
      .lte('created_at', `${endDate}T23:59:59.999Z`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tickets:', error);
      setTickets([]);
    } else {
      setTickets(data || []);
    }
    setLoading(false);
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      tickets.map(ticket => ({
        Email: ticket.user_email,
        'Номер билета': ticket.number,
        'Дата создания': new Date(ticket.created_at).toLocaleString(),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Билеты');
    XLSX.writeFile(workbook, `tickets_${selectedWeek}.xlsx`);
  };

  const formatWeekDisplay = (week: string) => {
    const [start, end] = week.split('_');
    return `${new Date(start).toLocaleDateString()} - ${new Date(end).toLocaleDateString()}`;
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <label htmlFor="week-select" className="mr-2 text-white">
            Выберите неделю:
          </label>
          <select
            id="week-select"
            value={selectedWeek}
            onChange={e => setSelectedWeek(e.target.value)}
            className="rounded border border-gray-600 bg-gray-700 p-2 text-white"
          >
            {weekOptions.map(week => (
              <option key={week} value={week}>
                {formatWeekDisplay(week)}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={handleDownload} disabled={tickets.length === 0}>
          <Download className="mr-2 h-4 w-4" />
          Скачать Excel
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-white">Загрузка...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Номер билета</TableHead>
              <TableHead className="text-white">Дата создания</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map(ticket => (
              <TableRow key={ticket.id} className="border-gray-700">
                <TableCell className="text-white">
                  {ticket.user_email}
                </TableCell>
                <TableCell className="text-white">{ticket.number}</TableCell>
                <TableCell className="text-white">
                  {new Date(ticket.created_at).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {tickets.length === 0 && !loading && (
        <p className="mt-4 text-center text-white">
          Нет данных за выбранный период.
        </p>
      )}
    </div>
  );
};

export default TicketsManager;
