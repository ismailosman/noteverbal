import React from 'react';
import { Clock, Search } from 'lucide-react';

interface HistoryNote {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  place: string;
  date: string;
  reference: string;
  createdAt: string;
}

// Sample history data
const historyData: HistoryNote[] = [
  {
    id: '1',
    sender: 'Permanent Mission Somalia',
    recipient: 'United Nations Security Council',
    subject: 'Monthly Report Submission',
    body: 'The Permanent Mission of Somalia presents its compliments...',
    place: 'New York, USA',
    date: '2024-03-15',
    reference: 'PRFGS0324',
    createdAt: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    sender: 'Permanent Mission Somalia',
    recipient: 'Office of the Secretary-General',
    subject: 'Response to Resolution 2024/01',
    body: 'The Permanent Mission of Somalia acknowledges receipt...',
    place: 'New York, USA',
    date: '2024-03-10',
    reference: 'PRFGS0324',
    createdAt: '2024-03-10T14:15:00Z'
  }
];

interface HistoryProps {
  onSelect: (note: Omit<HistoryNote, 'id' | 'createdAt'>) => void;
}

export default function History({ onSelect }: HistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = historyData.filter(note => 
    note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">History</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="space-y-4">
        {filteredHistory.map((note) => (
          <div
            key={note.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              const { id, createdAt, ...noteData } = note;
              onSelect(noteData);
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {note.subject}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  To: {note.recipient}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Ref: {note.reference}
                </p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(note.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}