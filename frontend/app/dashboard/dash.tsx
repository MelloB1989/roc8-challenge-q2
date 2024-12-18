"use client";
import Sidebar from "@/components/ui/dashboard/sidebar";
import "react-toastify/dist/ReactToastify.css";
import Nav from "@/components/ui/dashboard/nav";
import { Button } from "@/components/ui/button";
import DateFilter from "@/components/ui/dashboard/dateFilter";
import AgeFilter from "@/components/ui/dashboard/ageFilter";
import GenderFilter from "@/components/ui/dashboard/genderFilter";
import Bar from "@/components/ui/dashboard/bar";
import Line from "@/components/ui/dashboard/line";
import { useDashStore } from "@/app/states/dashboard";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Dashboard() {
  const { filters, clearFilters, getDashboardData, error, shareView } =
    useDashStore();
  useEffect(() => {
    // console.log(filters);
    getDashboardData();
  }, [filters]);

  useEffect(() => {
    console.log(error);
    if (error !== "") {
      toast.error(error);
    }
  }, [error]);
  return (
    <>
      <ToastContainer />
      <Nav />
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
          {/* Filters Section */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <DateFilter />
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <AgeFilter />
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <GenderFilter />
            </div>
          </div>
          {/* Clear Filters Button */}
          <div className="flex justify-end mb-4">
            <Button variant="destructive" onClick={clearFilters}>
              Clear Filters
            </Button>
            <Button
              variant="link"
              onClick={async () => {
                const r = await shareView();
                if (r) {
                  navigator.clipboard.writeText(r);
                  toast.success("View create and copied!");
                } else {
                  toast.error("Failed to create view");
                }
              }}
            >
              Share this view
            </Button>
          </div>
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-screen">
            <div className="rounded bg-gray-50 dark:bg-gray-800 p-4 flex justify-center items-center h-[300px] md:h-[500px]">
              <Bar className="w-full h-full" />
            </div>
            <div className="rounded bg-gray-50 dark:bg-gray-800 p-4 flex justify-center items-center h-[300px] md:h-[500px]">
              <Line className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
