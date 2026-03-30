"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import axios from "axios";
import {
  Search,
  LogOut,
  ChevronRight,
  Mail,
  Calendar,
  Lock,
} from "lucide-react";

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  loan_amount: number;
  status: string;
  created_at: string;
  unique_lead_id: string;
  income_source: string;
  monthly_net: number;
  pay_frequency: string;
  bank_type: string;
  routing_number?: string;
  account_number?: string;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchLeads(token);
  }, [router]);

  const fetchLeads = async (token: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/leads`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setLeads(response.data.leads);
    } catch (error) {
      router.push("/admin/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.unique_lead_id.includes(searchTerm),
  );

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="w-12 h-12 border-4 border-[#003B5C] border-t-transparent rounded-full animate-spin" />
        <p className="font-bold text-[#003B5C]">Loading internal vault...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-black text-[#003B5C] tracking-tighter">
              PST<span className="text-[#4CAF50]">Admin</span>
            </div>
            <div className="hidden md:block h-6 w-px bg-gray-200 mx-2" />
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Lock className="w-3 h-3" /> Encrypted Session
            </div>
          </div>
          <Button
            variant="ghost"
            className="text-gray-500 hover:text-red-600 font-bold flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-10 space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-[#003B5C] tracking-tight">
              Lead Management
            </h1>
            <p className="text-gray-500 font-medium">
              Manage and review internal loan applications.
            </p>
          </div>
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#003B5C] transition-colors" />
            <input
              placeholder="Search by name, email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-[#003B5C] transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b">
                  <tr>
                    <th className="px-8 py-5">Lead Info</th>
                    <th className="px-8 py-5">Loan Details</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className={`hover:bg-blue-50/30 transition-colors cursor-pointer group`}
                      onClick={() => router.push(`/admin/dashboard/${lead.id}`)}
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-[#003B5C]">
                            {lead.first_name[0]}
                            {lead.last_name[0]}
                          </div>
                          <div>
                            <div className="font-bold text-[#003B5C]">
                              {lead.first_name} {lead.last_name}
                            </div>
                            <div className="text-xs text-gray-400 flex items-center gap-1">
                              <Mail className="w-3 h-3" /> {lead.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="font-black text-[#003B5C]">
                          ${lead.loan_amount.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-gray-400 flex items-center gap-1 font-bold uppercase tracking-tighter">
                          <Calendar className="w-3 h-3" />{" "}
                          {new Date(lead.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            lead.status === "New"
                              ? "bg-blue-50 text-blue-600 border-blue-100"
                              : lead.status === "Approved"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                : lead.status === "Declined"
                                  ? "bg-red-50 text-red-600 border-red-100"
                                  : lead.status === "Documents Requested"
                                    ? "bg-amber-50 text-amber-600 border-amber-100"
                                    : "bg-gray-50 text-gray-600 border-gray-100"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronRight className="w-5 h-5 text-[#003B5C]" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
