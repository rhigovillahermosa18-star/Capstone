"use client";

export default function Book() {
  return (
    <div className="min-h-screen bg-[#e8c1cc]">

      <div className="bg-[#d9a9b4] py-4 text-center">
        <h1>MARVELOUSLY POLISHED</h1>
      </div>

      <div className="flex justify-center mt-12">
        <div className="bg-white p-6 rounded-xl shadow-md w-80">
          <h2 className="text-center font-semibold mb-4">
            Book Appointment 💅
          </h2>

          <input placeholder="Full Name"
            className="w-full mb-3 p-2 border rounded" />

          <input type="date"
            className="w-full mb-3 p-2 border rounded" />

          <select className="w-full mb-3 p-2 border rounded">
            <option>Select a time</option>
            <option>10:00 AM</option>
            <option>1:00 PM</option>
            <option>4:00 PM</option>
          </select>

          <button className="w-full bg-pink-400 text-white py-2 rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}