"use client";
import Sidebar from "@/components/ui/dashboard/sidebar";
import "react-toastify/dist/ReactToastify.css";
import Nav from "@/components/ui/dashboard/nav";
import Bar from "@/components/ui/dashboard/bar";
import Line from "@/components/ui/dashboard/line";
import { useDashStore } from "@/app/states/dashboard";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { View } from "@/app/states/views";

export default function ViewPage({ view }: { view: View }) {
  const { getDashboardData, error, setFilters } = useDashStore();
  useEffect(() => {
    setFilters(view.filters);
    setTimeout(() => {
      getDashboardData();
    }, 1000);
  }, []);

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
