"use client";
import Sidebar from "@/components/ui/dashboard/sidebar";
import Nav from "@/components/ui/dashboard/nav";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useViewsStore, View } from "../states/views";
import { toast, ToastContainer } from "react-toastify";

const Card = ({ loading, data }: { loading: boolean; data?: View }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderSkeleton = () => (
    <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 space-y-4">
      <Skeleton height={30} />
      <Skeleton height={20} width="50%" />
      <Skeleton height={20} />
      <Skeleton height={30} width="100%" />
      <Skeleton height={50} />
    </div>
  );

  const renderCardContent = () => (
    <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          Created At:{" "}
          {new Date(
            data?.created_at ? data.created_at : "",
          ).toLocaleDateString()}
        </div>
        <button className="text-blue-500 text-sm" onClick={handleCopyLink}>
          {copied ? "Link Copied!" : "Copy Link"}
        </button>
      </div>
      <div className="text-sm text-gray-500">
        <div>Age: {data?.filters?.age}</div>
        <div>Gender: {data?.filters?.gender}</div>
        <div>
          From: {data?.filters?.date_start} - To: {data?.filters?.date_end}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-sm mx-auto">
      {loading ? renderSkeleton() : renderCardContent()}
    </div>
  );
};

export default function Dashboard() {
  const { views, getViews, loading, error } = useViewsStore();

  useEffect(() => {
    getViews();
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
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Your Views
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {views.length > 0 ? (
              views.map((view) => (
                <Card key={view.vid} loading={loading} data={view} />
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-300">
                No views found
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
