import React from 'react';
import { FileText } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  place: string;
  date: string;
  reference: string;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'General Note Verbal',
    sender: 'Permanent Mission Somalia',
    recipient: '',
    subject: '',
    body: 'The Permanent Mission of Somalia to the United Nations presents its compliments to [Recipient] and has the honor to...',
    place: 'New York, USA',
    date: new Date().toISOString().split('T')[0],
    reference: ''
  },
  {
    id: '2',
    name: 'Meeting Request',
    sender: 'Permanent Mission Somalia',
    recipient: '',
    subject: 'Request for Bilateral Meeting',
    body: 'The Permanent Mission of Somalia to the United Nations presents its compliments and has the honor to request a bilateral meeting with [Recipient] to discuss matters of mutual interest...',
    place: 'New York, USA',
    date: new Date().toISOString().split('T')[0],
    reference: ''
  }
];

interface TemplatesProps {
  onSelect: (template: Omit<Template, 'id' | 'name'>) => void;
}

export default function Templates({ onSelect }: TemplatesProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Templates</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              const { id, name, ...templateData } = template;
              onSelect(templateData);
            }}
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {template.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {template.body.substring(0, 100)}...
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}