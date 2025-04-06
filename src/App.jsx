import { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { motion } from "framer-motion";

export default function App() {
  const [bankData, setBankData] = useState([]);
  const [ledgerData, setLedgerData] = useState([]);
  const [matched, setMatched] = useState([]);
  const [unmatched, setUnmatched] = useState([]);

  const handleFileUpload = (e, setter) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setter(results.data);
      },
    });
  };

  const similarity = (a, b) => {
    if (!a || !b) return 0;
    a = a.toLowerCase();
    b = b.toLowerCase();
    const sameWords = a.split(" ").filter((word) => b.includes(word));
    return sameWords.length / Math.max(a.split(" ").length, 1);
  };

  const matchTransactions = () => {
    const matched = [];
    const unmatched = [];

    bankData.forEach((bankRow) => {
      const match = ledgerData.find((ledgerRow) => {
        const sameAmount = bankRow.Amount === ledgerRow.Amount;
        const sameDate = bankRow.Date === ledgerRow.Date;
        const descSim = similarity(bankRow.Description, ledgerRow.Description);
        return sameAmount && sameDate && descSim > 0.6;
      });

      if (match) {
        matched.push({ ...bankRow });
      } else {
        unmatched.push({ ...bankRow });
      }
    });

    setMatched(matched);
    setUnmatched(unmatched);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const matchedSheet = XLSX.utils.json_to_sheet(matched);
    const unmatchedSheet = XLSX.utils.json_to_sheet(unmatched);
    XLSX.utils.book_append_sheet(wb, matchedSheet, "Matched");
    XLSX.utils.book_append_sheet(wb, unmatchedSheet, "Unmatched");
    XLSX.writeFile(wb, "autorecon-report.xlsx");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          🔍 AutoRecon Match Engine
        </h1>
        <p className="text-lg text-gray-300">
          Upload your files. Match automatically. Export your report.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <UploadCard label="Bank File" onChange={(e) => handleFileUpload(e, setBankData)} />
        <UploadCard label="Ledger File" onChange={(e) => handleFileUpload(e, setLedgerData)} />
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={matchTransactions}
          disabled={!bankData.length || !ledgerData.length}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl transition disabled:opacity-50"
        >
          🔁 Match Transactions
        </button>

        {(matched.length || unmatched.length) > 0 && (
          <button
            onClick={exportToExcel}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl transition"
          >
            ⬇️ Download Excel Report
          </button>
        )}
      </div>

      {matched.length > 0 && <DataTable data={matched} title="✅ Matched Transactions" />}
      {unmatched.length > 0 && <DataTable data={unmatched} title="❌ Unmatched Transactions" />}
    </div>
  );
}

function UploadCard({ label, onChange }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl">
      <p className="text-lg font-semibold mb-3">{label}</p>
      <input
        type="file"
        accept=".csv"
        onChange={onChange}
        className="bg-white text-black px-4 py-2 rounded-xl w-full cursor-pointer"
      />
    </div>
  );
}

function DataTable({ data, title }) {
  if (!data || data.length === 0) return null;
  const columns = Object.keys(data[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white/5 backdrop-blur-md p-6 mb-10 rounded-xl overflow-auto shadow-xl"
    >
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/10">
            <tr>
              {columns.map((col) => (
                <th key={col} className="p-2 text-left">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((row, i) => (
              <tr key={i} className="border-t border-white/10">
                {columns.map((col) => (
                  <td key={col} className="p-2 text-white/90">
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
