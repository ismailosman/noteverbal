import React from 'react';

interface FormData {
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  place: string;
  date: string;
  reference: string;
}

interface NoteFormProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function NoteForm({ data, onChange }: NoteFormProps) {
  React.useEffect(() => {
    // Set default values when component mounts
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear()).slice(-2);
    const reference = `PRFGS${month}${year}`;
    
    onChange({
      ...data,
      sender: 'Permanent Mission Somalia',
      place: 'New York, USA',
      reference,
      date: currentDate.toISOString().split('T')[0]
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'date') {
      // Auto-generate reference number based on date
      const date = new Date(value);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);
      const reference = `PRFGS${month}${year}`;
      onChange({ ...data, [name]: value, reference });
    } else {
      onChange({ ...data, [name]: value });
    }
  };

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="reference"
            className="block text-sm font-medium text-gray-700"
          >
            Reference Number
          </label>
          <input
            type="text"
            id="reference"
            name="reference"
            value={data.reference}
            readOnly
            className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={data.date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="sender"
            className="block text-sm font-medium text-gray-700"
          >
            Sender
          </label>
          <input
            type="text"
            id="sender"
            name="sender"
            value={data.sender}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Permanent Mission Somalia"
          />
        </div>

        <div>
          <label
            htmlFor="recipient"
            className="block text-sm font-medium text-gray-700"
          >
            Recipient
          </label>
          <input
            type="text"
            id="recipient"
            name="recipient"
            value={data.recipient}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Ministry of Foreign Affairs..."
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={data.subject}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Re: Diplomatic Note Regarding..."
        />
      </div>

      <div>
        <label
          htmlFor="body"
          className="block text-sm font-medium text-gray-700"
        >
          Note Content
        </label>
        <textarea
          id="body"
          name="body"
          rows={8}
          value={data.body}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="The Permanent Mission of Somalia presents its compliments to..."
        />
      </div>

      <div>
        <label
          htmlFor="place"
          className="block text-sm font-medium text-gray-700"
        >
          Place
        </label>
        <input
          type="text"
          id="place"
          name="place"
          value={data.place}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="New York, USA"
        />
      </div>
    </form>
  );
}