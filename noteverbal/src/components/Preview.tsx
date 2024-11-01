import React from 'react';
import { Download } from 'lucide-react';
import Barcode from './Barcode';

interface PreviewProps {
  data: {
    sender: string;
    recipient: string;
    subject: string;
    body: string;
    place: string;
    date: string;
    reference: string;
  };
}

export default function Preview({ data }: PreviewProps) {
  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="relative">
      <button className="absolute top-0 right-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        <Download className="w-4 h-4 mr-2" />
        Export PDF
      </button>

      <div className="max-w-2xl mx-auto mt-12 p-8 bg-white border border-gray-200 shadow-sm">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="text-center border-b border-gray-200 pb-6">
            <img
              src="https://unmission.gov.so/wp-content/uploads/2023/letterhead.png"
              alt="Official Letterhead"
              className="h-32 mx-auto mb-6"
            />
          </div>

          {/* Reference and Date Section */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-700 font-medium">
                Ref: {data.reference}
              </p>
              <p className="text-gray-600 mt-1">
                Date: {formattedDate}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">{data.place}</p>
            </div>
          </div>

          {/* Sender and Recipient */}
          <div className="mt-8">
            <p className="font-semibold">{data.sender}</p>
            <p className="mt-4">To:</p>
            <p className="font-semibold">{data.recipient}</p>
          </div>

          {/* Subject */}
          <div>
            <p className="font-semibold">Subject: {data.subject}</p>
          </div>

          {/* Body */}
          <div className="whitespace-pre-wrap leading-relaxed">
            {data.body}
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>425 East 61st Street, Suite 702</p>
            <p>New York, N.Y. 10065</p>
            <p className="mt-2">Tel: (212) 688-9410 • Fax: (212) 759-0651</p>
          </div>

          {/* Barcode under footer */}
          <div className="mt-8 pt-4">
            <Barcode value={data.reference} />
          </div>
        </div>
      </div>
    </div>
  );
}