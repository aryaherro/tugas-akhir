// File: lib/exporters.ts

import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export function ExportToCSV<T extends Record<string, any>>(data: T[], filename: string) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${filename}.csv`);
}

export function ExportToExcel<T extends Record<string, any>>(data: T[], filename: string) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${filename}.xlsx`);
}

export function ExportToPDF<T extends Record<string, any>>(columns: string[], data: T[], filename: string) {
    const doc = new jsPDF();

    const rows = data.map((item) => columns.map((col) => item[col] ?? ''));

    autoTable(doc, {
        head: [columns],
        body: rows,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [40, 40, 40] },
        margin: { top: 20 },
    });

    doc.save(`${filename}.pdf`);
}
